import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { error } from 'console';
import { ResponseMessage } from 'src/common/message/message.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserAllergyEntity } from '../entities/user-allergy.entity';
import { AllergyEntity } from '../entities/allergy.entity';

@Injectable()
export class GetModel {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
		@InjectRepository(UserAllergyEntity)
		private readonly UserAllergyRepository: Repository<UserAllergyEntity>,
		@InjectRepository(AllergyEntity)
		private readonly AllergyRepository: Repository<AllergyEntity>,
	) {}

	async getUsers() {
		try {
			const result = await this.UserRepository.find(); // ganti ke querybuilder
			return result;
		} catch (error) {
			throw error;
		}
	}

	async getUserById(uid) {
		try {
			const result = await this.UserRepository.createQueryBuilder('user')
				.select('*')
				.where('uid = :uid', { uid: uid })
				.getRawOne();

			if (!result)
				throw new HttpException(
					ResponseMessage.ERR_USER_NOT_FOUND,
					HttpStatus.BAD_REQUEST,
				);

			return result;
		} catch (error) {
			throw error;
		}
	}

	async getUserAllergyByUserId(uid: string): Promise<AllergyEntity[]> {
		const query = this.UserAllergyRepository.createQueryBuilder('ua')
			.select('a.id', 'id')
			.addSelect('a.name', 'name')
			.leftJoin(AllergyEntity, 'a', 'a.id = ua.allergy_id')
			.where('user_id = :user_id', { user_id: uid });

		return await query.getRawMany();
	}

	async getAllergyByIds(allergy_ids: Array<number>): Promise<AllergyEntity[]> {
		const query = this.AllergyRepository.createQueryBuilder('a')
			.select('id')
			.addSelect('name')
			.where('id IN (:...allergy_ids)', { allergy_ids });
		return await query.getRawMany();
	}
}
