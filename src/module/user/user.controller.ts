/* Nestjs Dependencies */
import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

/* Other Dependencies */
import { ResponseMessage } from 'src/common/message/message.enum';
import { TidyResponse } from 'src/util/responseHelper';
import { UserService } from './user.service';

/* DTO */
// import { ExampleDTO } from './dto/example.dto'; // example DTO

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers(@Res() res: FastifyReply) {
		const data = await this.userService.getUsers();
		return new TidyResponse(HttpStatus.OK, ResponseMessage.OK, data);
	}
}
