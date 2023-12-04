import { Injectable } from '@nestjs/common';
import { GetModel } from './models/get.model';
import { StoreModel } from './models/store.model';
import { UpdateModel } from './models/update.model';
import { CalculationHelper } from 'src/util/calculationHelper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
	private readonly calculationHelper = new CalculationHelper();

	constructor(
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
			const tdee = this.calculationHelper.calculateTDEE(
				user.weight,
				user.height,
				age,
				user.gender,
				user.activity,
			);

			const data = {
				...user,
				age,
				bmi: Math.round(bmi * 100) / 100,
				tdee: Math.round(tdee * 100) / 100,
			};
			return data;
		} catch (error) {
			throw error;
		}
	}

	async storeUser(params: CreateUserDto, uid: string) {
		try {
			const data = await this.storeModel.storeUser({ params, uid });

			await this.storeModel.storeUserAllergy({
				params,
				uid,
			});

			return data;
		} catch (error) {
			throw error;
		}
	}

	async updateUser(params: UpdateUserDto, uid: string) {
		try {
			await this.updateModel.deleteExistingAllergy(uid);
			const user = await this.updateModel.updateUser({ params, uid });
			let allergies = {};
			if (params.allergies.length > 0) {
				await this.storeModel.storeUserAllergy({ params, uid });
			}
			return {
				user,
				allergies,
			};
		} catch (error) {
			throw error;
		}
	}
}
