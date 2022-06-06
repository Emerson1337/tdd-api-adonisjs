import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export interface UserCreateDTO extends HttpContextContract {
	email: string;
	username: string;
	password: string;
}
