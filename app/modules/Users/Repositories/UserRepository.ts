import { UserCreateDTO } from 'App/interfaces/users';
import { User } from 'App/Models/User';

export class UserRepository {
	public async createUser(userPayload: UserCreateDTO) {
		const user = await User.create(userPayload);

		return user;
	}

	public async getUserByEmail(email: string) {
		const user = await User.findBy('email', email);

		return user;
	}

	public async getUserByUsername(username: string) {
		const user = await User.findBy('username', username);

		return user;
	}
}
