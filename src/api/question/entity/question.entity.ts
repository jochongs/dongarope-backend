import { Question } from '@prisma/client';

export class QuestionEntity {
  idx: number;
  title: string;
  createdAt: Date;

  constructor(data: { idx: number; title: string; createdAt: Date }) {
    this.idx = data.idx;
    this.title = data.title;
    this.createdAt = data.createdAt;
  }

  static createQuestionEntity(question: Question): QuestionEntity {
    return new QuestionEntity({
      idx: question.idx,
      title: question.title,
      createdAt: question.createdAt,
    });
  }
}
