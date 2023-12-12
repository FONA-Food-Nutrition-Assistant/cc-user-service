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

	async getUsers(): Promise<UserEntity[]> {
		const query = this.UserRepository.createQueryBuilder('user');
		return await query.getRawMany();
	}

	async getUserById(uid: string): Promise<UserEntity> {
		const query = this.UserRepository.createQueryBuilder('user')
			.select('*')
			.where('uid = :uid', { uid: uid });

		return await query.getRawOne();
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
		let query = this.AllergyRepository.createQueryBuilder('a')
			.select('id')
			.addSelect('name');
		if (allergy_ids.length > 0) {
			query = query.where('id IN (:...allergy_ids)', { allergy_ids });
		} else {
			query = query.where('1 = 0');
		}
		return await query.getRawMany();
	}
}
