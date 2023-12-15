/* Nestjs Dependencies */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* Other Dependencies */

/* Controller */
import { UserController } from './user.controller';

/* Service */
import { UserService } from './user.service';

/* Model */
import { GetModel } from './models/get.model';
import { StoreModel } from './models/store.model';
import { UpdateModel } from './models/update.model';

/* Entity */
import { UserEntity } from './entities/user.entity';
import { UserAllergyEntity } from './entities/user-allergy.entity';
import { AllergyEntity } from './entities/allergy.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, UserAllergyEntity, AllergyEntity]),
	],
	controllers: [UserController],
	providers: [
		/** Services */
		UserService,

		/** Models */
		GetModel,
		StoreModel,
		UpdateModel,
	],
})
export class UserModule {}
