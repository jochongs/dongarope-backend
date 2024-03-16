import { IsEmail, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 10)
  name: string;

  @IsString()
  @Length(5, 12)
  id: string;

  @IsString()
  @Length(6, 18)
  pw: string;
}
