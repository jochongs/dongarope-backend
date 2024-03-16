import { IsEmail, IsString } from 'class-validator';

export class SendEmailVerificationCodeDto {
  @IsEmail()
  @IsString()
  email: string;
}
