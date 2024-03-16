import { UnauthorizedException } from '@nestjs/common';

export class InvalidJwtException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
  }
}
