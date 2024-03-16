import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailVerificationCodeDto } from './dto/send-email-verification-code.dto';
import { EmailAuthService } from './email-auth.service';
import { CheckEmailVerificationCodeDto } from './dto/check-email-verification-code.dto';

@Controller('/email-auth')
export class EmailAuthController {
  constructor(private readonly emailAuthService: EmailAuthService) {}

  @Post('/send')
  public async sendEmailVerificationCode(
    @Body() sendDto: SendEmailVerificationCodeDto,
  ): Promise<void> {
    return await this.emailAuthService.sendEmailVerificationCode(sendDto.email);
  }

  @Post('/check')
  public async checkEmailVerificationCode(
    @Body() checkDto: CheckEmailVerificationCodeDto,
  ): Promise<void> {
    return await this.emailAuthService.checkEmailVerificationCode(checkDto);
  }
}
