import { UserCreateDTO } from '../../../../interfaces/users';
import { UserRepository } from '../Repositories';

export class CreateUserService {
	public async createUser(userPayload: UserCreateDTO) {
		const userRepository: UserRepository = new UserRepository();

		const userAlreadyExists = await userRepository.getUserByEmail(userPayload.email);

		if (userAlreadyExists) {
			return {
				message: 'email already in use',
				code: 'BAD_REQUEST',
				status: 409,
			};
		}

		const user = await userRepository.createUser(userPayload);

		return { user };
	}
}
