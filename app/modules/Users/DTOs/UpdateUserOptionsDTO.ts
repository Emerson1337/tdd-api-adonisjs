import { UserUpdateDTO } from '../../../Interfaces/users/UserUpdateDTO';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export interface UpdateUserOptionsDTO {
	secureId: string;
	userPayload: UserUpdateDTO;
	ctx: HttpContextContract;
}
