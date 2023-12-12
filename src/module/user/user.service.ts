import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetModel } from './models/get.model';
import { StoreModel } from './models/store.model';
import { UpdateModel } from './models/update.model';
import { CalculationHelper } from 'src/util/calculationHelper';
import { CreateUserDto } from './dto/create-user.dto';
import { RequestUpdateUserDto } from './dto/update-user.dto';
import { runInTransaction } from 'src/common/db/run-in-transaction';
import { DataSource } from 'typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import { UserAllergyEntity } from './entities/user-allergy.entity';

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

			if (!user) {
				throw new HttpException(
					ResponseMessage.ERR_USER_NOT_FOUND,
					HttpStatus.BAD_REQUEST,
				);
			}

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
				const user = await this.getModel.getUserById(uid);

				if (user) {
					throw new HttpException(
						ResponseMessage.ERR_USER_HAS_BEEN_REGISTERED,
						HttpStatus.BAD_REQUEST,
					);
				}

				const allergies = await this.getModel.getAllergyByIds(params.allergies);
				const isAllergyExist = allergies.length === params.allergies.length;

				if (!isAllergyExist) {
					throw new HttpException(
						"Allergy doesn't exist",
						HttpStatus.BAD_REQUEST,
					);
				}

				const { allergies: _, ...rest } = params;
				const newUserData = { uid, ...rest };

				const data = await this.storeModel.storeUser(newUserData, em);

				const prepUserAllergy = params.allergies.map(allergyId => ({
					user_id: uid,
					allergy_id: allergyId,
				})) as Array<UserAllergyEntity>;

				await this.storeModel.storeUserAllergy(prepUserAllergy, em);

				return data;
			});
		} catch (error) {
			throw error;
		}
	}

	async updateUser(params: RequestUpdateUserDto, uid: string) {
		try {
			return await runInTransaction(this.dataSource, async em => {
				const user = await this.getModel.getUserById(uid);

				if (!user) {
					throw new HttpException(
						ResponseMessage.ERR_USER_NOT_FOUND,
						HttpStatus.BAD_REQUEST,
					);
				}

				const { allergies: _, ...newUserData } = params;

				await this.updateModel.updateUser(newUserData, uid, em);

				if (!params.allergies) {
					const userAllergies = await this.getModel.getUserAllergyByUserId(uid);
					const data = { ...user, ...newUserData, allergies: userAllergies };
					return data;
				}

				const allergies = await this.getModel.getAllergyByIds(params.allergies);
				const isAllergyExist = allergies.length === params.allergies.length;

				if (!isAllergyExist) {
					throw new HttpException(
						"Allergy doesn't exist",
						HttpStatus.BAD_REQUEST,
					);
				}

				await this.updateModel.deleteExistingUserAllergy(uid, em);
				const prepUserAllergy = params.allergies.map(allergyId => ({
					user_id: uid,
					allergy_id: allergyId,
				})) as Array<UserAllergyEntity>;

				await this.storeModel.storeUserAllergy(prepUserAllergy, em);

				const data = { ...user, ...newUserData, allergies };

				return data;
			});
		} catch (error) {
			throw error;
		}
	}
}
