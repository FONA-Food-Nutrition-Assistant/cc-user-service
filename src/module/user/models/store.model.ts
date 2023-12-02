import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAllergyEntity } from '../entities/user-allergy.entity';

@Injectable()
export class StoreModel {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
		@InjectRepository(UserAllergyEntity)
		private readonly UserAllergyRepository: Repository<UserAllergyEntity>,
	) {}

	async storeUser({ params, uid }) {
		try {
			const checker = await this.UserRepository.createQueryBuilder('user')
				.where('uid = :uid', { uid: uid })
				.orWhere('email = :email', { email: params.email })
				.getRawOne();

			if (checker) {
				throw new HttpException(
					ResponseMessage.ERR_USER_HAS_BEEN_REGISTERED,
					HttpStatus.BAD_REQUEST,
				);
			}

			const newUser = {
				uid,
				...params,
			};

			const result = await this.UserRepository.createQueryBuilder()
				.insert()
				.values([newUser])
				.execute();

			return result;
		} catch (error) {
			throw error;
		}
	}

	async storeUserAllergy({ params, uid }) {
		try {
			const valuesPrep = params.allergies.map(allergy_id => ({
				user_id: uid,
				allergy_id,
			}));
			const query = this.UserAllergyRepository.createQueryBuilder('ua')
				.insert()
				.values(valuesPrep);

			return await query.execute();
		} catch (error) {
			throw error;
		}
	}
}
