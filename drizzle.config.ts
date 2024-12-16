import '@nestjs/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/database.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
