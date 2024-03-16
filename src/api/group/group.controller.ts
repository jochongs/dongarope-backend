import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from '../../common/decorator/group.decorator';
import { LoginGroupDto } from '../../common/dto/login-group.dto';
import { GroupLoginAuthGuard } from '../../common/guard/group-auth.guard';

@Controller('/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/my')
  @UseGuards(GroupLoginAuthGuard)
  public async getLoginGroup(@Group() loginGroup: LoginGroupDto) {
    return await this.groupService.getGroupEntity(loginGroup.idx);
  }

  @Post('/')
  public async createGroup(@Body() createDto: CreateGroupDto) {
    await this.groupService.createGroup(createDto);
  }
}
