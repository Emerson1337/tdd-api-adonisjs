import { User } from 'App/Models/User';
import { UserCreateDTO } from 'App/Interfaces/users/UserCreateDTO';
import { UserUpdateDTO } from 'App/Interfaces/users/UserUpdateDTO';

export class IUsersRepository {
	createUser: (userPayload: UserCreateDTO) => Promise<User | null>;
	updateUser: (secureId: string, userPayload: UserUpdateDTO) => Promise<User | null>;
	getUserByEmail: (email: string) => Promise<User | null>;
	getUserBySecureId: (secureId: string) => Promise<User | null>;
	getUserByUsername: (username: string) => Promise<User | null>;
}
