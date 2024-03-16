import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionEntity } from './entity/question.entity';
import { QuestionNotFoundException } from './exception/QuestionNotFoundException';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllQuestionByGenerationUUID(
    uuid: string,
  ): Promise<QuestionEntity[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        Generation: {
          uuid: uuid,
        },
        deletedAt: null,
      },
      orderBy: {
        idx: 'desc',
      },
    });

    return questions.map((question) =>
      QuestionEntity.createQuestionEntity(question),
    );
  }

  public async createQuestion(
    generationIdx: number,
    createDto: CreateQuestionDto,
  ): Promise<void> {
    await this.prisma.question.create({
      data: {
        generationIdx,
        title: createDto.title,
      },
    });
  }

  public async deleteQuestionByIdx(groupIdx: number, questionIdx: number) {
    const question = await this.prisma.question.findFirst({
      include: {
        Generation: {
          include: {
            Group: true,
          },
        },
      },
      where: {
        idx: questionIdx,
      },
    });

    if (!question) {
      throw new QuestionNotFoundException('Cannot find question');
    }

    if (question.Generation.Group.idx !== groupIdx) {
      throw new ForbiddenException('Permission denied');
    }

    await this.prisma.question.update({
      where: {
        idx: questionIdx,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async updateQuestionByIdx(
    groupIdx: number,
    questionIdx: number,
    updateDto: CreateQuestionDto,
  ): Promise<void> {
    const question = await this.prisma.question.findFirst({
      include: {
        Generation: {
          include: {
            Group: true,
          },
        },
      },
      where: {
        idx: questionIdx,
      },
    });

    if (!question) {
      throw new QuestionNotFoundException('Cannot find question');
    }

    if (question.Generation.Group.idx !== groupIdx) {
      throw new ForbiddenException('Permission denied');
    }

    await this.prisma.question.update({
      where: {
        idx: questionIdx,
      },
      data: {
        title: updateDto.title,
      },
    });
  }
}
