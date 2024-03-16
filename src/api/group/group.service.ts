import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailAuthService } from '../email-auth/email-auth.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { NoAuthEmailException } from './exception/NoAuthEmailException';
import { DuplicatedIdException } from './exception/DuplicatedIdException';
import { UtilService } from '../../util/util.service';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailAuthService: EmailAuthService,
    private readonly utilService: UtilService,
  ) {}

  public async createGroup(createDto: CreateGroupDto) {
    const emailAuthState =
      await this.emailAuthService.getEmailVerificationState(createDto.email);

    if (!emailAuthState) {
      throw new NoAuthEmailException('No email auth');
    }

    await this.prisma.$transaction(async (tx) => {
      const duplicatedId = await tx.group.findFirst({
        where: {
          id: createDto.id,
          deletedAt: null,
        },
      });

      if (duplicatedId) {
        throw new DuplicatedIdException('Duplicated Id');
      }

      await tx.group.create({
        data: {
          id: createDto.id,
          email: createDto.email,
          name: createDto.name,
          pw: this.utilService.hashPw(createDto.pw),
        },
      });

      await this.emailAuthService.deleteEmailAuthState(createDto.email);
    });
  }
}
