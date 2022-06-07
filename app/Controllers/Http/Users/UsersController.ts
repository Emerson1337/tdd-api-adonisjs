import { UserUpdateDTO } from 'App/Interfaces/users/UserUpdateDTO';
import { CreateUserService } from 'App/Modules/Users/Services';
import { UpdateUserService } from 'App/Modules/Users/Services/UpdateUserService';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserCreateDTO } from 'App/Interfaces/users';

export default class UsersController {
	public async store(ctx: HttpContextContract) {
		const createUserService = new CreateUserService();

		const userPayload: UserCreateDTO = ctx.request.only([
			'email',
			'username',
			'password',
			'avatar',
		]);

		const user = await createUserService.createUser({ ctx, userPayload });

		return ctx.response.created(user);
	}

	public async update(ctx: HttpContextContract) {
		const updateUserService = new UpdateUserService();
		const userPayload: UserUpdateDTO = ctx.request.only(['email', 'password', 'avatar']);

		const secureId = ctx.request.param('secure_id');

		const user = await updateUserService.updateUser({ secureId, ctx, userPayload });

		return ctx.response.ok(user);
	}
}
