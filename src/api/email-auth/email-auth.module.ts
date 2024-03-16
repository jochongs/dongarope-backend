import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailConfig from '../../common/config/email.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UtilModule } from '../../util/util.module';
import { EmailAuthController } from './email-auth.controller';
import { EmailAuthService } from './email-auth.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UtilModule,
    ConfigModule.forFeature(emailConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('email'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailAuthController],
  providers: [EmailAuthService],
  exports: [EmailAuthService],
})
export class EmailAuthModule {}
