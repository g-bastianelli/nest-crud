import { Module } from '@nestjs/common';
import { UserClaimsService } from './claims.service';
import { UserClaimsController } from './claims.controller';
import { DatabaseModule } from '../../../db';

@Module({
  imports: [DatabaseModule],
  controllers: [UserClaimsController],
  providers: [UserClaimsService],
})
class UserClaimsModule {}

export { UserClaimsModule };
