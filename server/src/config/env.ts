import dotenv from 'dotenv'
import { z } from 'zod'

import { NodeEnvEnum } from '../enums'

dotenv.config()

const envSchema = z.object({
  PORT: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1024).max(65535).default(3333),
  ),
  APP_HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.nativeEnum(NodeEnvEnum).default(NodeEnvEnum.DEVELOPMENT),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1024).max(65535).default(5432),
  ),
  DATABASE_URL: z.string().optional(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string(),
  CLOUDFLARE_BUCKET: z.string().default('brevly-csvs'),
  CLOUDFLARE_ENDPOINT: z.string(),
})

const parsedEnv = envSchema.parse(process.env)

const DB_HOST =
  parsedEnv.NODE_ENV === NodeEnvEnum.DEVELOPMENT
    ? 'localhost'
    : parsedEnv.DB_HOST

export const env = {
  ...parsedEnv,
  DB_HOST,
}
