import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserCreateDTO } from 'App/interfaces/users';

export interface CreateUserOptionsDTO {
	userPayload: UserCreateDTO;
	ctx: HttpContextContract;
}
