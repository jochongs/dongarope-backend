import { IsString, Length } from 'class-validator';

export class CreateGenerationDto {
  @IsString()
  @Length(2, 8)
  name: string;
}
