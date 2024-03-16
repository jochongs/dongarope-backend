import { NotFoundException } from '@nestjs/common';

export class QuestionNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
