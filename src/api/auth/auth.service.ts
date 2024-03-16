import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GroupLoginDto } from './dto/group-login.dto';
import { InvalidIdOrPwException } from './exception/InvalidIdOrPwException';
import { UtilService } from '../../util/util.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_TYPE } from './enum/JWT_TYPE';
import { InvalidJwtException } from './exception/InvalidJwtException';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilService: UtilService,
    private readonly jwtService: JwtService,
  ) {}

  public async groupLogin(loginDto: GroupLoginDto): Promise<string> {
    const group = await this.prisma.group.findFirst({
      where: {
        id: loginDto.id,
        deletedAt: null,
      },
    });

    if (!group) {
      throw new InvalidIdOrPwException('Invalid id or pw');
    }

    if (!this.utilService.compareHashedPw(loginDto.pw, group.pw)) {
      throw new InvalidIdOrPwException('Invalid id or pw');
    }

    const groupLoginAccessToken = this.jwtService.sign(
      {
        idx: group.idx,
        type: JWT_TYPE.GROUP,
      },
      {
        expiresIn: '24h',
      },
    );

    return groupLoginAccessToken;
  }

  public verifyGroupLoginAccessToken(token: string) {
    const payload = this.jwtService.verify<{
      idx: number;
      type: JWT_TYPE;
    }>(token);

    if (payload.type != JWT_TYPE.GROUP) {
      throw new InvalidJwtException('Invalid jwt');
    }

    return payload;
  }
}
