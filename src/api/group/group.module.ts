import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { EmailAuthModule } from '../email-auth/email-auth.module';
import { UtilModule } from '../../util/util.module';

@Module({
  imports: [PrismaModule, EmailAuthModule, UtilModule],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {}
