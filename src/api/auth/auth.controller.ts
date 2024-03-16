import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GroupLoginDto } from './dto/group-login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/group')
  public async groupLogin(@Body() loginDto: GroupLoginDto) {
    const token = await this.authService.groupLogin(loginDto);

    return {
      loginAccessToken: token,
    };
  }
}
