import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@db';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
class UsersModule {}

export { UsersModule };
