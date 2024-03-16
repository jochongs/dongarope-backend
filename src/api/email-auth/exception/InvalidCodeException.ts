import { BadRequestException } from '@nestjs/common';

export class InvalidCodeException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
