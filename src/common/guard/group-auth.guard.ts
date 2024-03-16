import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../../api/auth/auth.service';
import { InvalidJwtException } from '../../api/auth/exception/InvalidJwtException';

@Injectable()
export class GroupLoginAuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new InvalidJwtException('Cannot find token');
    }

    const payload = this.authService.verifyGroupLoginAccessToken(token);

    const group = await this.prisma.group.findUnique({
      where: {
        idx: payload.idx,
        deletedAt: null,
      },
    });

    if (!group) {
      throw new InvalidJwtException('Cannot find user');
    }

    request.group = {
      idx: payload.idx,
    };

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer') {
      return null;
    }

    if (!token) {
      return null;
    }

    return token;
  }
}
