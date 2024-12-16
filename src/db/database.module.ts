import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './database.schema';
import { DatabaseService } from './database.service';
import { TEST_CRUD_DB } from './database.consts';

@Module({
  providers: [
    {
      provide: TEST_CRUD_DB,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        //TODO GBA remove ⬇
        console.log(config.get('DATABASE_URL'));
        return drizzle(config.get('DATABASE_URL'), { schema });
      },
    },
    DatabaseService,
  ],
  exports: [TEST_CRUD_DB],
})
class DatabaseModule {}

export { DatabaseModule };
