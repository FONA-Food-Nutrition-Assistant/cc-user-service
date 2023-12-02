import {
	IsNotEmpty,
	IsString,
	IsEmail,
	IsNumber,
	IsEnum,
	IsOptional,
	IsArray,
	isNumber,
	ArrayNotEmpty,
} from 'class-validator';

import { Gender } from '../../../common/enum/gender.enum';
import { Activity } from 'src/common/enum/activity.enum';

export class CreateUserDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsNumber()
	height: number;

	@IsNotEmpty()
	@IsNumber()
	weight: number;

	@IsNotEmpty()
	@IsEnum(Activity)
	activity: number;

	@IsNotEmpty()
	@IsEnum(Gender)
	gender: string;

	@IsString()
	date_of_birth: string;

	@IsArray()
	@IsNumber({}, { each: true })
	allergies: Array<number>;
}
