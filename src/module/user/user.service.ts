import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetModel } from './models/get.model';
import { StoreModel } from './models/store.model';
import { UpdateModel } from './models/update.model';
import { CalculationHelper } from 'src/util/calculationHelper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { runInTransaction } from 'src/common/db/run-in-transaction';
import { DataSource } from 'typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';

@Injectable()
export class UserService {
	private readonly calculationHelper = new CalculationHelper();

	constructor(
		private readonly dataSource: DataSource,
		private readonly getModel: GetModel,
		private readonly storeModel: StoreModel,
		private readonly updateModel: UpdateModel,
	) {}

	async getUsers() {
		return await this.getModel.getUsers();
	}

	async getUserById(uid: string) {
		try {
			const user = await this.getModel.getUserById(uid);
			const age = this.calculationHelper.calculateAge(user.date_of_birth);
			const bmi = this.calculationHelper.calculateBMI(user.weight, user.height);
			const bmiStatus = this.calculationHelper.getBMIStatus(bmi);
			const tdee = this.calculationHelper.calculateTDEE(
				user.weight,
				user.height,
				age,
				user.gender,
				user.activity,
			);
			const allergies = await this.getModel.getUserAllergyByUserId(uid);

			const data = {
				...user,
				age,
				bmi: Math.round(bmi * 100) / 100,
				bmi_status: bmiStatus,
				tdee: Math.round(tdee * 100) / 100,
				allergies,
			};
			return data;
		} catch (error) {
			throw error;
		}
	}

	async storeUser(params: CreateUserDto, uid: string) {
		try {
			return await runInTransaction(this.dataSource, async em => {
				const allergies = await this.getModel.getAllergyByIds(params.allergies);
				const isAllergyExist = allergies.length === params.allergies.length;

				if (!isAllergyExist) {
					throw new HttpException(
						"Allergy doesn't exist",
						HttpStatus.BAD_REQUEST,
					);
				}

				const data = await this.storeModel.storeUser(params, uid, em);
				await this.storeModel.storeUserAllergy(params, uid, em);

				return data;
			});
		} catch (error) {
			throw error;
		}
	}

	async updateUser(params: UpdateUserDto, uid: string) {
		try {
			return await runInTransaction(this.dataSource, async em => {
				await this.updateModel.updateUser(params, uid, em);

				const allergies = await this.getModel.getAllergyByIds(params.allergies);
				const isAllergyExist = allergies.length === params.allergies.length;

				if (!isAllergyExist) {
					throw new HttpException(
						"Allergy doesn't exist",
						HttpStatus.BAD_REQUEST,
					);
				}

				if (params.allergies.length > 0) {
					await this.updateModel.deleteExistingUserAllergy(uid, em);
					await this.storeModel.storeUserAllergy(params, uid, em);
				}

				const user = await this.getModel.getUserById(uid);

				const data = { ...user, allergies };

				return data;
			});
		} catch (error) {
			throw error;
		}
	}
}
