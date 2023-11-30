import { Injectable } from '@nestjs/common';
import { GetModel } from './models/get.model';

@Injectable()
export class UserService {
	constructor(private readonly getModel: GetModel) {}

	async getUsers() {
		return await this.getModel.getUsers();
	}

	async getUserById(uid) {
		return await this.getModel.getUserById(uid);
	}

	async storeUser(params, uid) {
		return await this.getModel.storeUser({params, uid});
	}

	async updateUser(params, uid) {
		return await this.getModel.updateUser({params, uid});
	}
}
