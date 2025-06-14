import { env } from './src/config/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/infrastructure/database/drizzle/migrations',
  schema: './src/infrastructure/database/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
})
