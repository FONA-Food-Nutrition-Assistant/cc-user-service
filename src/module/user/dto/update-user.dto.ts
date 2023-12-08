import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsNumber, IsString, IsEnum, IsArray, IsEmail } from 'class-validator';

import { Gender } from '../../../common/enum/gender.enum';
import { Activity } from 'src/common/enum/activity.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsNumber()
	height: number;

	@IsNumber()
	weight: number;

	@IsEnum(Activity)
	activity: string;

	@IsEnum(Gender)
	gender: string;

	@IsString()
	date_of_birth: string;

	@IsArray()
	@IsNumber({}, { each: true })
	allergies: Array<number> = [];
}
