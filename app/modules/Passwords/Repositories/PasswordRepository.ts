import { UserCreateDTO } from 'App/Interfaces/users';
import { User } from 'App/Models/User';

export class PasswordRepository {
	public async forgotPassword(userPayload: UserCreateDTO): Promise<User | null> {
		const user = await User.create(userPayload);

		return user;
	}
}
