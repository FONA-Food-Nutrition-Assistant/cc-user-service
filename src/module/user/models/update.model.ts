import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAllergyEntity } from '../entities/user-allergy.entity';

@Injectable()
export class UpdateModel {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
		@InjectRepository(UserAllergyEntity)
		private readonly UserAllergyRepository: Repository<UserAllergyEntity>,
	) {}

	async updateUser({ params, uid }) {
		try {
			const user = await this.UserRepository.createQueryBuilder('user')
				.where('uid = :uid', { uid: uid })
				.getRawOne();

			if (!user)
				throw new HttpException(
					ResponseMessage.ERR_USER_NOT_FOUND,
					HttpStatus.BAD_REQUEST,
				);

			const { allergies, email, ...rest } = params;

			const updatedData = {
				...rest,
			};

			const result = await this.UserRepository.createQueryBuilder()
				.update()
				.set(updatedData)
				.where('uid = :uid', { uid: uid })
				.execute()
				.catch(error => {
					throw error; // Rethrow the error to handle it where the functio`n is called
				});

			return updatedData;
		} catch (error) {
			throw error;
		}
	}

	async deleteExistingAllergy(uid: string) {
		try {
			const query = this.UserAllergyRepository.createQueryBuilder('ua')
				.delete()
				.from('user_allergy')
				.where('user_id = :user_id', { user_id: uid });

			return await query.execute();
		} catch (error) {
			throw error;
		}
	}
}
