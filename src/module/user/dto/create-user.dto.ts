import {
	IsNotEmpty,
	IsString,
	IsNumber,
	IsEnum,
	IsArray,
} from 'class-validator';

import { Gender } from '../../../common/enum/gender.enum';
import { Activity } from 'src/common/enum/activity.enum';

export class CreateUserDto {
	@IsNotEmpty()
	@IsNumber()
	height: number;

	@IsNotEmpty()
	@IsNumber()
	weight: number;

	@IsNotEmpty()
	@IsEnum(Activity)
	activity: Activity;

	@IsNotEmpty()
	@IsEnum(Gender)
	gender: Gender;

	@IsNotEmpty()
	@IsString()
	date_of_birth: Date;

	@IsArray()
	@IsNumber({}, { each: true })
	allergies: Array<number>;
}
