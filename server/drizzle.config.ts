import { defineConfig } from 'drizzle-kit'

import { env } from './src/config/env'

export default defineConfig({
  out: './src/infrastructure/database/drizzle/migrations',
  schema: './src/infrastructure/database/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
})
