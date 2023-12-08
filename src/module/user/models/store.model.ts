import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAllergyEntity } from '../entities/user-allergy.entity';

@Injectable()
export class StoreModel {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
		@InjectRepository(UserAllergyEntity)
		private readonly UserAllergyRepository: Repository<UserAllergyEntity>,
	) {}

	async storeUser(
		params,
		uid: string,
		em: EntityManager = this.dataSource.manager,
	) {
		try {
			const checker = await this.UserRepository.createQueryBuilder('user')
				.where('uid = :uid', { uid: uid })
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

			return await em.save(UserEntity, newUser);
		} catch (error) {
			throw error;
		}
	}

	async storeUserAllergy(
		params,
		uid: string,
		em: EntityManager = this.dataSource.manager,
	) {
		try {
			const valuesPrep = params.allergies.map(allergy_id => ({
				user_id: uid,
				allergy_id,
			}));

			return await em.save(UserAllergyEntity, valuesPrep);
		} catch (error) {
			throw error;
		}
	}
}
