import { UserUpdateDTO } from 'App/Interfaces/users/UserUpdateDTO';
import { UserCreateDTO } from 'App/Interfaces/users';
import { User } from 'App/Models/User';

export class UserRepository {
	public async createUser(userPayload: UserCreateDTO) {
		const user = await User.create(userPayload);

		return user;
	}

	public async updateUser(secureId: string, userPayload: UserUpdateDTO) {
		const user = await this.getUserBySecureId(secureId);
		user.email = userPayload.email;
		user.password = userPayload.password;

		if (userPayload.avatar) {
			user.avatar = userPayload.avatar;
		}

		user.save();

		return user;
	}

	public async getUserByEmail(email: string) {
		const user = await User.findBy('email', email);

		return user;
	}

	public async getUserBySecureId(secureId: string) {
		const user = await User.findByOrFail('secure_id', secureId);

		return user;
	}

	public async getUserByUsername(username: string) {
		const user = await User.findBy('username', username);

		return user;
	}
}
