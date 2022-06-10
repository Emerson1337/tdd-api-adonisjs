import { validator } from '@ioc:Adonis/Core/Validator';
import BadRequest from 'App/Exceptions/BadRequestException';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';

import { UpdateUserOptionsDTO } from '../DTOs/UpdateUserOptionsDTO';
import { IUsersRepository } from '../Interfaces/IUsersRepository';

export class UpdateUserService {
	constructor(private userRepository: IUsersRepository) {}

	public async updateUser({ secureId, ctx, userPayload }: UpdateUserOptionsDTO) {
		const updateUserValidator = new UpdateUserValidator(ctx);

		await validator.validate({
			schema: updateUserValidator.schema,
			data: userPayload,
		});

		const userToUpdate = await this.userRepository.getUserBySecureId(secureId);

		if (!userToUpdate) {
			throw new BadRequest('User not found', 409);
		}

		const user = await this.userRepository.updateUser(secureId, userPayload);

		return { user };
	}
}
