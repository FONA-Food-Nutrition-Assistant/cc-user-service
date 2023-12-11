import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/message/message.enum';
import { DataSource, EntityManager, Repository, UpdateResult } from 'typeorm';
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
		userData: UserEntity,
		em: EntityManager = this.dataSource.manager,
	): Promise<UserEntity> {
		return await em.save(UserEntity, userData);
	}

	async storeUserAllergy(
		userAllergyData: Array<UserAllergyEntity>,
		em: EntityManager = this.dataSource.manager,
	): Promise<Array<UserAllergyEntity>> {
		return await em.save(UserAllergyEntity, userAllergyData);
	}
}
