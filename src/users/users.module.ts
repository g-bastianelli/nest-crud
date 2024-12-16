import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../db';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
})
class UsersModule {}

export { UsersModule };
