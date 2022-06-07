import { validator } from '@ioc:Adonis/Core/Validator';
import BadRequest from 'App/Exceptions/BadRequestException';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

import { CreateUserOptionsDTO } from '../DTOs/CreateUserOptionsDTO';
import { UserRepository } from '../Repositories';

export class CreateUserService {
	public async createUser({ ctx, userPayload }: CreateUserOptionsDTO) {
		const userRepository: UserRepository = new UserRepository();

		const createUserValidation = new CreateUserValidator(ctx);

		await validator.validate({
			schema: createUserValidation.schema,
			data: userPayload,
		});

		const userEmailExists = await userRepository.getUserByEmail(userPayload.email);

		if (userEmailExists) {
			throw new BadRequest('email already in use', 409);
		}

		const usernameExists = await userRepository.getUserByUsername(userPayload.username);

		if (usernameExists) {
			throw new BadRequest('username already in use', 409);
		}

		const user = await userRepository.createUser(userPayload);

		return { user };
	}
}
