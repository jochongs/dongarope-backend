import { Injectable } from '@nestjs/common';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';

@Injectable()
export class UtilService {
  public createRandomNumberString(size: number = 6): string {
    return Math.floor(Math.random() * 10 ** size)
      .toString()
      .padStart(6, '0');
  }

  public hashPw(pw: string): string {
    return hashSync(pw, genSaltSync(8));
  }

  public compareHashedPw(inputPw: string, hashedPw: string): boolean {
    return compareSync(inputPw, hashedPw);
  }
}
