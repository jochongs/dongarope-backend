import { IsString, Length } from 'class-validator';

export class GroupLoginDto {
  @IsString()
  @Length(1)
  id: string;

  @IsString()
  @Length(1)
  pw: string;
}
