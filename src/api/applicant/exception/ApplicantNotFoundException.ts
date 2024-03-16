import { NotFoundException } from '@nestjs/common';

export class ApplicantNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
