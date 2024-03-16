import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UtilService } from '../../util/util.service';
import { CheckEmailVerificationCodeDto } from './dto/check-email-verification-code.dto';
import { CodeNotFoundException } from './exception/CodeNotFoundException';
import { InvalidCodeException } from './exception/InvalidCodeException';

@Injectable()
export class EmailAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly utilService: UtilService,
  ) {}

  public async sendEmail(sendInfo: {
    toEmail: string;
    title: string;
    contents: string;
  }) {
    await this.mailerService.sendMail({
      to: sendInfo.toEmail,
      subject: sendInfo.title,
      html: sendInfo.contents,
    });
  }

  public async sendEmailVerificationCode(toEmail: string): Promise<void> {
    const randomCode = this.utilService.createRandomNumberString(6);

    await this.prisma.emailCode.create({
      data: {
        email: toEmail,
        code: randomCode,
      },
    });

    await this.sendEmail({
      toEmail,
      title: `동아줄 인증번호`,
      contents: `<h1>${randomCode}</h1>`,
    });

    return;
  }

  public async checkEmailVerificationCode(
    checkDto: CheckEmailVerificationCodeDto,
  ): Promise<void> {
    const timeLimit = new Date();
    timeLimit.setMinutes(timeLimit.getMinutes() - 3);

    const queryResult = await this.prisma.emailCode.findFirst({
      where: {
        email: checkDto.email,
        createdAt: {
          gt: timeLimit,
        },
      },
    });

    if (!queryResult) {
      throw new CodeNotFoundException('Cannot find verification code');
    }

    if (queryResult.code !== checkDto.code) {
      throw new InvalidCodeException('Invalid verification code');
    }

    await this.prisma.$transaction([
      this.prisma.emailAuth.create({
        data: {
          email: checkDto.email,
        },
      }),
      this.prisma.emailCode.delete({
        where: {
          idx: queryResult.idx,
        },
      }),
    ]);
  }

  public async getEmailVerificationState(email: string): Promise<boolean> {
    const timeLimit = new Date();
    timeLimit.setHours(timeLimit.getHours() - 12);

    const queryResult = await this.prisma.emailAuth.findFirst({
      where: {
        email: email,
        createdAt: {
          gt: timeLimit,
        },
      },
    });

    if (!queryResult) return false;

    return true;
  }
}
