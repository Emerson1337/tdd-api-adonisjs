import { validator } from '@ioc:Adonis/Core/Validator';
import BadRequest from 'App/Exceptions/BadRequestException';
import { UserCreateDTO } from 'App/interfaces/users';
import CreateUserValidator from 'App/Validators/CreateUserValidator';

import { UserRepository } from '../Repositories';

export class CreateUserService {
	public async createUser(userPayload: UserCreateDTO) {
		const userRepository: UserRepository = new UserRepository();

		const createUserValidation = new CreateUserValidator(userPayload);

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
