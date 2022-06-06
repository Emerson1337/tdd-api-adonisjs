import { CreateUserService } from 'App/Modules/Users/Services';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserCreateDTO } from 'App/interfaces/users';

export default class UsersController {
	public async store({ request, response }: HttpContextContract) {
		const createUserService = new CreateUserService();
		const userPayload: UserCreateDTO = request.only(['email', 'username', 'password', 'avatar']);

		const user = await createUserService.createUser(userPayload);

		return response.created(user);
	}
}
