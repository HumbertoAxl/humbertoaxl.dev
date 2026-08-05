import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// @ts-expect-error The production Netlify Function is plain ESM and is reused by Vite locally.
import contactHandler from './netlify/functions/contact.mjs'

const CONTACT_ENV_KEYS = [
  'ZEPTOMAIL_SEND_API_KEY',
  'ZEPTOMAIL_API_URL',
  'CONTACT_FROM_EMAIL',
  'CONTACT_TO_EMAIL',
] as const

const localContactApi = (): Plugin => ({
  name: 'local-contact-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (request, response) => {
      if (request.method !== 'POST') {
        response.statusCode = 405
        response.setHeader('content-type', 'application/json; charset=utf-8')
        response.end(JSON.stringify({ message: 'Method not allowed.' }))
        return
      }

      try {
        const chunks: Buffer[] = []
        for await (const chunk of request) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        }

        const headers = new Headers()
        for (const [name, value] of Object.entries(request.headers)) {
          if (Array.isArray(value)) {
            value.forEach((entry) => headers.append(name, entry))
          } else if (value !== undefined) {
            headers.set(name, value)
          }
        }

        const functionResponse = await contactHandler(
          new Request('http://localhost/api/contact', {
            method: 'POST',
            headers,
            body: Buffer.concat(chunks).toString('utf8'),
          }),
        )

        response.statusCode = functionResponse.status
        functionResponse.headers.forEach((value: string, name: string) => {
          response.setHeader(name, value)
        })
        response.end(await functionResponse.text())
      } catch (error) {
        console.error('Local contact API failed.', error)
        response.statusCode = 500
        response.setHeader('content-type', 'application/json; charset=utf-8')
        response.end(JSON.stringify({ message: 'Local contact API failed.' }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), '')
  for (const key of CONTACT_ENV_KEYS) {
    if (localEnv[key] !== undefined) process.env[key] = localEnv[key]
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      localContactApi(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
