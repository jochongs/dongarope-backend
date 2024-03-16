import {
  IsArray,
  IsEmail,
  IsInt,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class Answers {
  @IsInt()
  questionIdx: number;

  @IsString()
  @Length(1, 100)
  contents: string;
}

export class CreateApplicantDto {
  @IsString()
  @Length(2, 8)
  name: string;

  @IsEmail()
  email: string;

  @ValidateNested({ each: true })
  @IsArray()
  answers: Answers[];
}
