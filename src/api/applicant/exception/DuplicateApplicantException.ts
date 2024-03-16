import { ConflictException } from '@nestjs/common';

export class DuplicatedApplicantException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
