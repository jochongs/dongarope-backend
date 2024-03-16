import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from '../../common/decorator/group.decorator';
import { LoginGroupDto } from '../../common/dto/login-group.dto';
import { GroupLoginAuthGuard } from '../../common/guard/group-auth.guard';
import { GenerationEntity } from '../generation/entity/generation.entity';
import { GenerationService } from '../generation/generation.service';

@Controller('/group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly generationService: GenerationService,
  ) {}

  @Get('/my')
  @UseGuards(GroupLoginAuthGuard)
  public async getLoginGroup(@Group() loginGroup: LoginGroupDto) {
    return await this.groupService.getGroupEntity(loginGroup.idx);
  }

  @Get('/generation/all')
  @UseGuards(GroupLoginAuthGuard)
  public async getGenerationsByGroupIdx(
    @Group() loginGroup: LoginGroupDto,
  ): Promise<{
    generations: GenerationEntity[];
  }> {
    const generations = await this.generationService.getGenerationsByGroupIdx(
      loginGroup.idx,
    );

    return {
      generations,
    };
  }

  @Post('/')
  public async createGroup(@Body() createDto: CreateGroupDto) {
    await this.groupService.createGroup(createDto);
  }
}
