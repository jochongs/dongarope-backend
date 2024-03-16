import { NotFoundException } from '@nestjs/common';

export class GenerationNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
