import { IsString, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @Length(1, 100)
  title: string;
}
