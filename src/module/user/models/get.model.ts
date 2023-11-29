import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class GetModel {
	constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: Repository<UserEntity>,
	) {}

	async getUsers() {
		try {
			const result = this.UserRepository.query(`SELECT * FROM USERS`); // ganti ke querybuilder
			return result;

		} catch (error) {
			throw error;
		}
	}

	// async getFonaMembersWithLearningPath() {
	// 	try {
	// 		const query = this.MemberRepository.createQueryBuilder('mem')
	// 			.select('mem.id', 'id')
	// 			.addSelect('mem.name', 'name')
	// 			.addSelect('mem.email', 'email')
	// 			.addSelect('lp.name', 'learningPath')
	// 			.leftJoin(LearningPathEntity, 'lp', 'lp.id = mem.learning_path')
	// 			.orderBy('mem.id, mem.name', 'ASC');

	// 		return {
	// 			data: await query.getRawMany(),
	// 			total_data: await query.getCount(),
	// 		};
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }

	// async createFonaMembersWithLearningPath() {
	// 	try {
	// 		const user = { 
	// 			name: 'Fikri Dean Radityo', 
	// 			email: 'deanradityo@gmail.com', 
	// 			learning_path: 1
	// 		};

	// 		const result = this.MemberRepository.insert(user);
	// 		return result;

	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }
}
