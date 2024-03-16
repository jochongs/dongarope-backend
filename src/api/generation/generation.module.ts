import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';
import { QuestionModule } from '../question/question.module';
import { ApplicantModule } from '../applicant/applicant.module';

@Module({
  imports: [PrismaModule, QuestionModule, ApplicantModule],
  providers: [GenerationService],
  controllers: [GenerationController],
  exports: [GenerationService],
})
export class GenerationModule {}
