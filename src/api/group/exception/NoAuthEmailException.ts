import { ForbiddenException } from '@nestjs/common';

export class NoAuthEmailException extends ForbiddenException {
  constructor(message: string) {
    super(message);
  }
}
