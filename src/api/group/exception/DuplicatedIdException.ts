import { ConflictException } from '@nestjs/common';

export class DuplicatedIdException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
