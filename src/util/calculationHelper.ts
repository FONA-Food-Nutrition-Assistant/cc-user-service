import { Activity } from 'src/common/enum/activity.enum';
import { ActivityValue } from 'src/common/const/activity.const';
import { Gender } from 'src/common/enum/gender.enum';
import { BMIStatus } from 'src/common/enum/bmi-status.enum';

export class CalculationHelper {
	calculateAge(dateOfBirth: Date) {
		return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
	}

	calculateBMI(weight: number, height: number) {
		return weight / Math.pow(height / 100, 2);
	}

	calculateTDEE(
		weight: number,
		height: number,
		age: number,
		gender: Gender,
		activity: Activity,
	) {
		const activityValue = ActivityValue[activity];
		let bmr: number;
		if (gender === Gender.MALE) {
			bmr = 10 * weight + 6.25 * height - 5 * age + 5;
		} else {
			bmr = 10 * weight + 6.25 * height - 5 * age - 161;
		}
		const tdee = bmr * activityValue;
		return tdee;
	}

	getBMIStatus(bmi: number) {
		if (bmi < 18.5) {
			return BMIStatus.UNDERWEIGHT;
		} else if (bmi < 25) {
			return BMIStatus.NORMAL;
		} else if (bmi < 30) {
			return BMIStatus.OVERWEIGHT;
		} else {
			return BMIStatus.OBESE;
		}
	}
}
