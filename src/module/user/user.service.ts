import { Injectable } from '@nestjs/common';
import { GetModel } from './models/get.model';

@Injectable()
export class UserService {
	constructor(private readonly getModel: GetModel) {}

	async getUsers() {
		return await this.getModel.getUsers();
	}

	// async createFonaMembersWithLearningPath() {
	// 	return await this.getModel.createFonaMembersWithLearningPath();
	// }
}
