import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { error } from 'console';
import { ResponseMessage } from 'src/common/message/message.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserAllergyEntity } from '../entities/user-allergy.entity';

@Injectable()
export class GetModel {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
		@InjectRepository(UserAllergyEntity)
		private readonly UserAllergyRepository: Repository<UserAllergyEntity>,
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

	async getUserAllergyByUserId(uid: string) {
		try {
			const query = this.UserAllergyRepository.createQueryBuilder('ua')
				.select('*')
				.where('user_id = :user_id', { user_id: uid });

			return await query.getRawMany();
		} catch {
			throw error;
		}
	}
}
