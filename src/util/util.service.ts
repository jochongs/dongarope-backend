import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  public createRandomNumberString(size: number = 6): string {
    return Math.floor(Math.random() * 10 ** size)
      .toString()
      .padStart(6, '0');
  }
}
