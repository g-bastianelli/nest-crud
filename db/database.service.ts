import { Injectable, OnModuleInit } from '@nestjs/common';
import { reset, seed } from 'drizzle-seed';
import * as schema from './database.schema';
import { InjectDatabase } from './database.decorator';
import { DatabaseType } from './database.types';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

@Injectable()
class DatabaseService implements OnModuleInit {
  constructor(@InjectDatabase() private readonly db: DatabaseType) {}

  async onModuleInit() {
    await migrate(this.db, { migrationsFolder: './db/migrations' });
    await reset(this.db, schema);
    await seed(this.db, schema).refine((f) => ({
      users: {
        count: 20,
        columns: {
          id: f.uuid(),
          name: f.fullName(),
          email: f.email(),
        },
      },
      claims: {
        count: 200,
        columns: {
          id: f.uuid(),
          title: f.companyName(),
          description: f.loremIpsum(),
          value: f.int({ minValue: 0, maxValue: 100 }),
        },
      },
    }));
  }
}

export { DatabaseService };
