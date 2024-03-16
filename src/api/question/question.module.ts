import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { QuestionService } from './question.service';
import { QusetionController } from './question.controller';

@Module({
  imports: [PrismaModule],
  controllers: [QusetionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
