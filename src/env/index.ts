import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(8080),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

// validação do Schema de variáveis de ambiente
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data