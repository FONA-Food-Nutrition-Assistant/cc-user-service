import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import {
	IsNumber,
	IsString,
	IsEnum,
	IsArray,
	IsOptional,
} from 'class-validator';

import { Gender } from '../../../common/enum/gender.enum';
import { Activity } from 'src/common/enum/activity.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@IsNumber()
	height: number;

	@IsOptional()
	@IsNumber()
	weight: number;

	@IsOptional()
	@IsEnum(Activity)
	activity: string;

	@IsOptional()
	@IsEnum(Gender)
	gender: string;

	@IsOptional()
	@IsString()
	date_of_birth: string;

	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	allergies: Array<number> = [];
}
