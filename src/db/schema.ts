import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const claimsTable = pgTable('claims', {
  id: uuid().primaryKey(),
  userId: uuid().references(() => usersTable.id),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  value: integer().notNull(),
});
