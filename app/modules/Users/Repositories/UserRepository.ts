import { UserCreateDTO } from 'App/Interfaces/users';
import { UserUpdateDTO } from 'App/Interfaces/users/UserUpdateDTO';
import { User } from 'App/Models/User';

export class UserRepository {
	public async createUser(userPayload: UserCreateDTO): Promise<User | null> {
		const user = await User.create(userPayload);

		return user;
	}

	public async updateUser(secureId: string, userPayload: UserUpdateDTO): Promise<User | null> {
		const user = await this.getUserBySecureId(secureId);

		if (user) {
			user.email = userPayload.email;
			user.password = userPayload.password;

			if (userPayload.avatar) {
				user.avatar = userPayload.avatar;
			}

			await user.save();
		}

		return user;
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		const user = await User.findBy('email', email);

		return user;
	}

	public async getUserBySecureId(secureId: string): Promise<User | null> {
		const user = await User.findByOrFail('secure_id', secureId);

		return user;
	}

	public async getUserByUsername(username: string): Promise<User | null> {
		const user = await User.findBy('username', username);

		return user;
	}
}
