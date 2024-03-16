import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationEntity } from './entity/generation.entity';
import { GroupLoginAuthGuard } from '../../common/guard/group-auth.guard';
import { Group } from '../../common/decorator/group.decorator';
import { LoginGroupDto } from '../../common/dto/login-group.dto';
import { CreateGenerationDto } from './dto/create-generation.dto';

@Controller('/generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Get('/:uuid')
  public async getGenerationByUUID(
    @Param('uuid') uuid: string,
  ): Promise<GenerationEntity> {
    return await this.generationService.getGenerationByUUID(uuid);
  }

  @Post('/')
  @UseGuards(GroupLoginAuthGuard)
  public async createGeneration(
    @Group() loginGroup: LoginGroupDto,
    @Body() createDto: CreateGenerationDto,
  ): Promise<GenerationEntity> {
    return await this.generationService.createGeneration(
      loginGroup.idx,
      createDto,
    );
  }
}
