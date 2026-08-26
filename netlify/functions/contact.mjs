const CONTACT_EMAIL = 'contact@humbertoaxl.dev';
const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 10_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jsonResponse = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

export default async (request) => {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 20_000) {
    return jsonResponse(413, { message: 'Request is too large.' });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { message: 'Invalid request.' });
  }

  const name = typeof payload?.name === 'string' ? payload.name.trim().replace(/\s+/g, ' ') : '';
  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload?.message === 'string' ? payload.message.trim() : '';
  const website = typeof payload?.website === 'string' ? payload.website.trim() : '';

  if (website) return jsonResponse(200, { message: 'Message received.' });

  if (!name || name.length > MAX_NAME_LENGTH) {
    return jsonResponse(400, { message: 'Enter a name under 120 characters.' });
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return jsonResponse(400, { message: 'Enter a valid email address.' });
  }

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse(400, { message: 'Enter a message under 10,000 characters.' });
  }

  const sendApiKey = process.env.ZEPTOMAIL_SEND_API_KEY ?? process.env.ZEPTOMAIL_SEND_TOKEN;
  if (!sendApiKey) {
    console.error('ZEPTOMAIL_SEND_API_KEY is not configured.');
    return jsonResponse(503, { message: 'Contact form is not configured.' });
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? CONTACT_EMAIL;
  const toAddress = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL;
  const apiUrl = process.env.ZEPTOMAIL_API_URL ?? 'https://api.zeptomail.com/v1.1/email';
  const authorization = sendApiKey.startsWith('Zoho-enczapikey ')
    ? sendApiKey
    : `Zoho-enczapikey ${sendApiKey}`;

  try {
    const zeptoResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify({
        from: { address: fromAddress, name: `${name} via humbertoaxl.dev` },
        to: [{ email_address: { address: toAddress, name: 'Humberto Axl' } }],
        reply_to: [{ address: email, name }],
        subject: `Portfolio Contact From ${name}`,
        textbody: `New message from ${name}\nEmail: ${email}\n\n${message}`,
        track_clicks: false,
        track_opens: false,
      }),
    });

    if (!zeptoResponse.ok) {
      console.error('ZeptoMail request failed.', zeptoResponse.status, await zeptoResponse.text());
      return jsonResponse(502, { message: 'Email provider rejected the request.' });
    }

    return jsonResponse(200, { message: 'Message sent.' });
  } catch (error) {
    console.error('ZeptoMail request failed.', error);
    return jsonResponse(502, { message: 'Email provider is unavailable.' });
  }
};

export const config = {
  path: '/api/contact',
  method: 'POST',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['domain', 'ip'],
    windowSize: 60,
    windowLimit: 5,
  },
};
