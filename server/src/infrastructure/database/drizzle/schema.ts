import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const linksTable = pgTable('links', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  long_url: varchar('long_url', { length: 2048 }).notNull(),
  shortened_link: varchar('shortened_link', { length: 255 }).notNull(),
  clicks: integer('clicks').notNull(),
  created_at: varchar('created_at', { length: 255 }).notNull(),
  updated_at: varchar('updated_at', { length: 255 }).notNull(),
})
