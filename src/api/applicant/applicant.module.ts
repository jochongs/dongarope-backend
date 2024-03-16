import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { EmailAuthModule } from '../email-auth/email-auth.module';

@Module({
  imports: [PrismaModule, EmailAuthModule],
  controllers: [ApplicantController],
  providers: [ApplicantService],
  exports: [ApplicantService],
})
export class ApplicantModule {}
