import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import { DataSource, EntityManager, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAllergyEntity } from '../entities/user-allergy.entity';

@Injectable()
export class UpdateModel {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
		@InjectRepository(UserAllergyEntity)
		private readonly UserAllergyRepository: Repository<UserAllergyEntity>,
	) {}

	async updateUser(
		params,
		uid: string,
		em: EntityManager = this.dataSource.manager,
	): Promise<UpdateResult> {
		try {
			const user = await this.UserRepository.createQueryBuilder('user')
				.where('uid = :uid', { uid: uid })
				.getRawOne();

			if (!user)
				throw new HttpException(
					ResponseMessage.ERR_USER_NOT_FOUND,
					HttpStatus.BAD_REQUEST,
				);

			const { allergies, ...rest } = params;

			return await this.UserRepository.createQueryBuilder()
				.update()
				.set(rest)
				.where('uid = :uid', { uid: uid })
				.execute();
		} catch (error) {
			throw error;
		}
	}

	async deleteExistingUserAllergy(
		uid: string,
		em: EntityManager = this.dataSource.manager,
	) {
		try {
			return await em.delete(UserAllergyEntity, { user_id: uid });
		} catch (error) {
			throw error;
		}
	}
}
