import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { GroupLoginAuthGuard } from '../../common/guard/group-auth.guard';
import { Group } from '../../common/decorator/group.decorator';
import { LoginGroupDto } from '../../common/dto/login-group.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('/question')
export class QusetionController {
  constructor(private readonly questionService: QuestionService) {}

  @Delete('/:idx')
  @UseGuards(GroupLoginAuthGuard)
  public async deleteQuestionByIdx(
    @Param('idx', ParseIntPipe) questionIdx: number,
    @Group() loginGroup: LoginGroupDto,
  ): Promise<void> {
    await this.questionService.deleteQuestionByIdx(loginGroup.idx, questionIdx);
  }

  @Put('/:idx')
  @UseGuards(GroupLoginAuthGuard)
  public async updateQuestionByIdx(
    @Param('idx', ParseIntPipe) questionIdx: number,
    @Group() loginGroup: LoginGroupDto,
    @Body() updateDto: CreateQuestionDto,
  ): Promise<void> {
    await this.questionService.updateQuestionByIdx(
      loginGroup.idx,
      questionIdx,
      updateDto,
    );
  }
}
