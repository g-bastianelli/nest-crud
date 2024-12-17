import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const claims = pgTable('claims', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  value: integer().notNull(),
});
