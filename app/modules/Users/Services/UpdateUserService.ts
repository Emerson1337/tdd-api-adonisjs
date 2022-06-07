import { validator } from '@ioc:Adonis/Core/Validator';
import BadRequest from 'App/Exceptions/BadRequestException';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';

import { UpdateUserOptionsDTO } from '../DTOs/UpdateUserOptionsDTO';
import { UserRepository } from '../Repositories';

export class UpdateUserService {
	public async updateUser({ secureId, ctx, userPayload }: UpdateUserOptionsDTO) {
		const userRepository: UserRepository = new UserRepository();

		const updateUserValidator = new UpdateUserValidator(ctx);

		await validator.validate({
			schema: updateUserValidator.schema,
			data: userPayload,
		});

		const userToUpdate = await userRepository.getUserBySecureId(secureId);

		if (!userToUpdate) {
			throw new BadRequest('User not found', 409);
		}

		const user = await userRepository.updateUser(secureId, userPayload);

		return { user };
	}
}
