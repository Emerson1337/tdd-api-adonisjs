import Mail from '@ioc:Adonis/Addons/Mail';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PasswordsController {
	public async forgotPassword(ctx: HttpContextContract) {
		const { email } = ctx.request.only(['email']);

		await Mail.send((message) => {
			message
				.from('no-reply@ocems.com')
				.to(email)
				.subject('OCEMS: Recuperação de senha')
				.text('Clique no link abaixo para redefinir a sua senha.');
		});

		return ctx.response.noContent();
	}
}
