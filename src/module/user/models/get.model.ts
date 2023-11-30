import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { error } from 'console';
import { ResponseMessage } from 'src/common/message/message.enum';


@Injectable()
export class GetModel {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
	) {}

	async getUsers() {
		try {
			const result = await this.UserRepository.find(); // ganti ke querybuilder
			return result;

		} catch (error) {
			throw error;
		}
	}

	async getUserById({uid}) {
		try {
			const result = this.UserRepository.findOne({
				where: {
					uid
				}
			})

			return result;

		} catch (error) {
			throw error;
		}
	}

	async storeUser({params, uid}) {
		try {
			const user = {
				uid: uid,
				email: params.email,
				height: params.height,
				weight: params.weight,
				activity: params.activity,
				gender: params.gender,
				date_of_birth: params.date_of_birth,
			}

			const checker = await this.UserRepository.findOne({
				where: {
					uid
				}
			})

			if (checker) {
				return checker;
			}

			const result = await this.UserRepository.insert(user);
			return result;
			
		} catch (error) {
			throw error;
		}
	}

	async updateUser({params, uid}) {
		try {
			const user = await this.UserRepository.findOne({
				where: {
					uid
				}
			})
			
			const updatedData = {
				uid,
				email: params.email || user.email,
				height: params.height || user.height,
				weight: params.weight || user.weight,
				activity: params.activity || user.activity,
				gender: params.gender || user.gender,
				date_of_birth: params.date_of_birth || user.date_of_birth,
			}

			const result = await this.UserRepository.update(user, updatedData);
			return result;

		} catch (error) {
			throw error;
		}
	}
}
