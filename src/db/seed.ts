import { reset, seed } from 'drizzle-seed';
import * as schema from './schema';
import { db } from './index';

async function seedTestCrudDb() {
  await reset(db, schema);
  return seed(db, schema).refine((f) => ({
    usersTable: {
      count: 20,
      columns: {
        id: f.uuid(),
        name: f.fullName(),
        email: f.email(),
      },
    },
    claimsTable: {
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

export { seedTestCrudDb };
