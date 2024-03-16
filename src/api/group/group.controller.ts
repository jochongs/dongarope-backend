import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/')
  public async createGroup(@Body() createDto: CreateGroupDto) {
    await this.groupService.createGroup(createDto);
  }
}
