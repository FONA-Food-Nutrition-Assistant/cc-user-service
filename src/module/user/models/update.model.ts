import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import {
	DataSource,
	DeleteResult,
	EntityManager,
	Repository,
	UpdateResult,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserAllergyEntity } from '../entities/user-allergy.entity';
import { RequestUpdateUserDto } from '../dto/update-user.dto';

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
		userData: UserEntity,
		uid: string,
		em: EntityManager = this.dataSource.manager,
	): Promise<UpdateResult> {
		return await em.update(UserEntity, uid, userData);
	}

	async deleteExistingUserAllergy(
		uid: string,
		em: EntityManager = this.dataSource.manager,
	): Promise<DeleteResult> {
		return await em.delete(UserAllergyEntity, { user_id: uid });
	}
}
