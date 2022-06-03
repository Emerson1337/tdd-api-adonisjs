import { User } from 'App/Models/User';

import { UserCreateDTO } from '../../../../interfaces/users';

export class UserRepository {
	public async createUser(userPayload: UserCreateDTO) {
		const user = await User.create(userPayload);

		return user;
	}

	public async getUserByEmail(email: string) {
		const user = await User.findBy('email', email);

		return user;
	}
}
