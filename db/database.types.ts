import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './database.schema';

type DatabaseType = NodePgDatabase<typeof schema>;

export { DatabaseType };
