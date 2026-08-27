import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { alpha } from '@mui/material/styles';
import SectionHeader from './ui/SectionHeader';
import { RESUME_CONTENT_WIDTH, SECTION_VERTICAL_PADDING } from '../theme';

const CONTACT_EMAIL = 'contact@humbertoaxl.dev';
const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 10_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'message';

interface FormValues {
  name: string;
  email: string;
  message: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validate = ({ name, email, message }: FormValues): FormErrors => {
  const errors: FormErrors = {};
  const normalizedName = name.trim();
  const normalizedEmail = email.trim();

  if (!normalizedName) {
    errors.name = 'Enter your name so I know who is getting in touch.';
  } else if (normalizedName.length > MAX_NAME_LENGTH) {
    errors.name = `Keep your name under ${MAX_NAME_LENGTH} characters.`;
  }

  if (!normalizedEmail) {
    errors.email = 'Enter your email so I can reply.';
  } else if (normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!message.trim()) {
    errors.message = 'Write a message before sending.';
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Keep your message under ${MAX_MESSAGE_LENGTH.toLocaleString()} characters.`;
  }

  return errors;
};

const Contact = () => {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      setStatusMessage('');
      return;
    }

    setStatus('sending');
    setStatusMessage('');
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        const publicMessage =
          response.status === 429
            ? 'Too many attempts. Please wait a minute and try again.'
            : response.status === 400 || response.status === 413
              ? result?.message
              : undefined;
        throw new Error(publicMessage || 'I couldn’t send your message. Please try again.');
      }
      setStatus('success');
      setStatusMessage('Message sent. I’ll get back to you as soon as I can.');
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The request took too long. Your text is still here—please try again.'
          : error instanceof Error
            ? error.message
            : 'I couldn’t send your message. Your text is still here—please try again.',
      );
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        pt: SECTION_VERTICAL_PADDING,
        pb: { xs: 4.5, md: 6 },
        px: { xs: 3, md: 6 },
      }}
    >
      <SectionHeader
        title="Contact"
        description="Have a role, project, or conversation in mind? Send a note here and it will go straight to my inbox."
      />

      <Box
        sx={{
          maxWidth: RESUME_CONTENT_WIDTH,
          mx: 'auto',
          pt: 0,
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ maxWidth: 760, mx: 'auto' }}
        >
          <Box
            component="input"
            aria-hidden
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={values.website}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setValues((current) => ({ ...current, website: event.target.value }))
            }
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              p: 0,
              m: '-1px',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              gap: 2.5,
            }}
          >
            <TextField
              fullWidth
              required
              variant="filled"
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange('name')}
              error={Boolean(errors.name)}
              helperText={errors.name}
              autoComplete="name"
              inputProps={{ maxLength: MAX_NAME_LENGTH }}
              disabled={status === 'sending'}
              sx={{
                '& .MuiInputBase-root': { fontSize: '1rem' },
              }}
            />

            <TextField
              fullWidth
              required
              variant="filled"
              type="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="email"
              inputProps={{ maxLength: 254 }}
              disabled={status === 'sending'}
              sx={{
                '& .MuiInputBase-root': { fontSize: '1rem' },
              }}
            />
          </Box>

          <TextField
            fullWidth
            required
            variant="filled"
            multiline
            minRows={7}
            maxRows={14}
            name="message"
            label="Your message"
            placeholder="Tell me what you would like to discuss."
            value={values.message}
            onChange={handleChange('message')}
            error={Boolean(errors.message)}
            helperText={errors.message}
            inputProps={{ maxLength: MAX_MESSAGE_LENGTH }}
            disabled={status === 'sending'}
            sx={{
              mt: 2.5,
              '& .MuiInputBase-root': { fontSize: '1rem', lineHeight: 1.65 },
            }}
          />

          <Box
            sx={{
              mt: 2.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {statusMessage && (
              <Box aria-live="polite" aria-atomic="true">
                <Typography
                  variant="body2"
                  sx={{
                    color: status === 'success' ? 'success.main' : 'error.main',
                    fontWeight: 650,
                    lineHeight: 1.55,
                    textAlign: 'center',
                  }}
                >
                  {statusMessage}
                </Typography>
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              size="medium"
              disabled={status === 'sending' || status === 'success'}
              startIcon={
                status === 'sending' ? (
                  <CircularProgress size={18} color="inherit" />
                ) : status === 'success' ? (
                  <CheckRoundedIcon />
                ) : (
                  <SendRoundedIcon />
                )
              }
              sx={{
                minHeight: 44,
                px: 3,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'sending'
                ? 'Sending…'
                : status === 'success'
                  ? 'Message sent'
                  : 'Send message'}
            </Button>
          </Box>

        </Box>

        <Box
          component="address"
          sx={{
            maxWidth: 760,
            mx: 'auto',
            mt: 3.5,
            fontStyle: 'normal',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontWeight: 650, textAlign: 'center' }}
          >
            Prefer to contact me directly?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              maxWidth: '100%',
              gap: 1.5,
            }}
          >
            <Box
              component="a"
              href={`mailto:${CONTACT_EMAIL}`}
              sx={(theme) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                minHeight: 44,
                minWidth: 0,
                flexShrink: 1,
                color: 'text.primary',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                '&:focus-visible': {
                  outline: `3px solid ${alpha(theme.palette.primary.main, 0.32)}`,
                  outlineOffset: 3,
                },
              })}
            >
              <EmailRoundedIcon aria-hidden sx={{ color: 'primary.main', fontSize: 21, flexShrink: 0 }} />
              <Box
                component="span"
                sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {CONTACT_EMAIL}
              </Box>
            </Box>
            <Box
              component="a"
              href="https://www.linkedin.com/in/humbertoaxl/"
              target="_blank"
              rel="noreferrer noopener"
              sx={(theme) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                minHeight: 44,
                flexShrink: 0,
                color: 'text.primary',
                fontWeight: 700,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
                '&:focus-visible': {
                  outline: `3px solid ${alpha(theme.palette.primary.main, 0.32)}`,
                  outlineOffset: 3,
                },
              })}
            >
              <LinkedInIcon aria-hidden sx={{ color: 'primary.main', fontSize: 22 }} />
              LinkedIn
              <ArrowOutwardRoundedIcon aria-hidden sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
