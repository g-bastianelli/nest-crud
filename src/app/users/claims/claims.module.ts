import { Module } from '@nestjs/common';
import { DatabaseModule } from '@db';
import { UserClaimsService } from './claims.service';
import { UserClaimsController } from './claims.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserClaimsController],
  providers: [UserClaimsService],
})
class UserClaimsModule {}

export { UserClaimsModule };
