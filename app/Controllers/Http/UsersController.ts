import { UserCreateDTO } from './../../../interfaces/users/UserCreateDTO';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
	public async store(): Promise<UserCreateDTO> {
		const userObject: UserCreateDTO = {
			email: 'test@gmail.com',
			password: '123',
			username: 'emerson',
		};

		return userObject;
	}
}
