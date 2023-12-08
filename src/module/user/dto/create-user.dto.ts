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
	activity: string;

	@IsNotEmpty()
	@IsEnum(Gender)
	gender: string;

	@IsString()
	date_of_birth: string;

	@IsArray()
	@IsNumber({}, { each: true })
	allergies: Array<number>;
}
