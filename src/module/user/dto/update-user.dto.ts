import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsNumber, IsNotEmpty, IsString, IsEmail, IsArray, IsEnum } from 'class-validator';

import { gender } from './gender.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;
  
  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  activity: number;

  @IsNotEmpty()
  @IsEnum(gender)
  gender: string;

  @IsString()
  date_of_birth: string;

  @IsString({each: true})
  alergies: string[]
}
