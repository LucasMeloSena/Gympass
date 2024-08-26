import { z } from 'zod'

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  VITE_SERVER_URL: z.string(),
  VITE_JWT_SECRET: z.string(),
  VITE_PASSWORD_SECRET: z.string(),
  MODE: z.enum(['production', 'development', 'test']),
})
const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  console.error('🔴 Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
