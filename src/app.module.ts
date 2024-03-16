import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { GenerationModule } from './api/generation/generation.module';
import { GroupModule } from './api/group/group.module';
import { QuestionModule } from './api/question/question.module';
import { EmailAuthModule } from './api/email-auth/email-auth.module';

@Module({
  imports: [
    AuthModule,
    GenerationModule,
    GroupModule,
    QuestionModule,
    EmailAuthModule,
  ],
})
export class AppModule {}
