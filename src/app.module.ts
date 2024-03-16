import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { GenerationModule } from './api/generation/generation.module';
import { GroupModule } from './api/group/group.module';
import { QuestionModule } from './api/question/question.module';

@Module({
  imports: [AuthModule, GenerationModule, GroupModule, QuestionModule],
})
export class AppModule {}
