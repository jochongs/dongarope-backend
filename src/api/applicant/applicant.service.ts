import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { EmailAuthService } from '../email-auth/email-auth.service';
import { NoAuthEmailException } from '../group/exception/NoAuthEmailException';
import { ApplicantNotFoundException } from './exception/ApplicantNotFoundException';
import { ApplicantEntity } from './entity/applicant.entity';
import { DuplicatedApplicantException } from './exception/DuplicateApplicantException';

@Injectable()
export class ApplicantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailAuthService: EmailAuthService,
  ) {}

  public async getApplicantByIdx(
    applicantIdx: number,
  ): Promise<ApplicantEntity> {
    const applicant = await this.prisma.applicant.findUnique({
      where: {
        idx: applicantIdx,
        deletedAt: null,
      },
    });

    if (!applicant) {
      throw new ApplicantNotFoundException('Cannot find applicant');
    }

    return ApplicantEntity.createApplicantEntity(applicant);
  }

  public async createApplicant(
    generationIdx: number,
    createDto: CreateApplicantDto,
  ): Promise<void> {
    const state = await this.emailAuthService.getEmailVerificationState(
      createDto.email,
    );

    if (!state) {
      throw new NoAuthEmailException('No auth email');
    }

    await this.prisma.$transaction(async (tx) => {
      const applicant = await tx.applicant.findFirst({
        where: {
          generationIdx,
          email: createDto.email,
        },
      });

      if (applicant) {
        throw new DuplicatedApplicantException('Duplicated applicant');
      }

      const createdApplicant = await tx.applicant.create({
        data: {
          generationIdx,
          name: createDto.name,
          email: createDto.email,
        },
      });

      await tx.answer.createMany({
        data: createDto.answers.map((answer) => ({
          applicantIdx: createdApplicant.idx,
          questionIdx: answer.questionIdx,
          contents: answer.contents,
        })),
      });
    });

    await this.emailAuthService.deleteEmailAuthState(createDto.email);
  }
}
