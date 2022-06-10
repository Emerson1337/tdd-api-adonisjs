import { validator } from '@ioc:Adonis/Core/Validator';
import BadRequest from 'App/Exceptions/BadRequestException';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

import { CreateUserOptionsDTO } from '../DTOs/CreateUserOptionsDTO';
import { IUsersRepository } from '../Interfaces/IUsersRepository';

export class CreateUserService {
	constructor(private userRepository: IUsersRepository) {}

	public async createUser({ ctx, userPayload }: CreateUserOptionsDTO) {
		const createUserValidation = new CreateUserValidator(ctx);

		await validator.validate({
			schema: createUserValidation.schema,
			data: userPayload,
		});

		const userEmailExists = await this.userRepository.getUserByEmail(userPayload.email);

		if (userEmailExists) {
			throw new BadRequest('email already in use', 409);
		}

		const usernameExists = await this.userRepository.getUserByUsername(userPayload.username);

		if (usernameExists) {
			throw new BadRequest('username already in use', 409);
		}

		const user = await this.userRepository.createUser(userPayload);

		return { user };
	}
}
