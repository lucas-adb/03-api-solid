import 'dotenv/config'
import { z } from 'zod'

const errorMessages = {
  INVALID_ENV: '❌ Invalid environment variables',
}

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(errorMessages.INVALID_ENV, _env.error.format())

  throw new Error(errorMessages.INVALID_ENV)
}

export const env = _env.data
