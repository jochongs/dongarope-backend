import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationEntity } from './entity/generation.entity';
import { GroupLoginAuthGuard } from '../../common/guard/group-auth.guard';
import { Group } from '../../common/decorator/group.decorator';
import { LoginGroupDto } from '../../common/dto/login-group.dto';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { QuestionService } from '../question/question.service';
import { QuestionEntity } from '../question/entity/question.entity';
import { CreateApplicantDto } from '../applicant/dto/create-applicant.dto';
import { ApplicantService } from '../applicant/applicant.service';

@Controller('/generation')
export class GenerationController {
  constructor(
    private readonly generationService: GenerationService,
    private readonly questionService: QuestionService,
    private readonly applicantService: ApplicantService,
  ) {}

  @Get('/:uuid')
  public async getGenerationByUUID(
    @Param('uuid', ParseUUIDPipe) uuid: string,
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

  @Post('/:uuid/question')
  @UseGuards(GroupLoginAuthGuard)
  public async createQusetion(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Group() LoginGroupDto: LoginGroupDto,
    @Body() createDto: CreateQuestionDto,
  ): Promise<void> {
    const generation = await this.generationService.getGenerationByUUID(uuid);

    if (generation.group.idx !== LoginGroupDto.idx) {
      throw new ForbiddenException('Permission denied');
    }

    return await this.questionService.createQuestion(generation.idx, createDto);
  }

  @Get('/:uuid/question/all')
  public async getQuestions(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<{
    questions: QuestionEntity[];
  }> {
    const questions = await this.questionService.getAllQuestionByGenerationUUID(
      uuid,
    );

    return {
      questions,
    };
  }

  @Post('/:uuid/applicant')
  public async createApplicant(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() createDto: CreateApplicantDto,
  ): Promise<void> {
    const generation = await this.generationService.getGenerationByUUID(uuid);

    await this.applicantService.createApplicant(generation.idx, createDto);
  }
}
