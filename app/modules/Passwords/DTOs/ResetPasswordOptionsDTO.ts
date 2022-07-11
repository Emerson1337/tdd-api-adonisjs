import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserCreateDTO } from 'App/Interfaces/users';

export interface CreateUserOptionsDTO {
	userPayload: UserCreateDTO;
	ctx: HttpContextContract;
}
