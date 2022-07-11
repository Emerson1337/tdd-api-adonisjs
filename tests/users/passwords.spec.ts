import Mail from '@ioc:Adonis/Addons/Mail';
import Database from '@ioc:Adonis/Lucid/Database';
// import { assert } from '@japa/preset-adonis';
import test from 'japa';
import supertest from 'supertest';

import { UserFactory } from '../../database/factories';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('Password reset', (group) => {
	test.only('It should be able to send an email with forgot password instructions', async (assert) => {
		const user = await UserFactory.create();

		const fakeMailer = Mail.fake();

		await supertest(BASE_URL)
			.post('/forgot-password')
			.send({
				email: user.email,
				resetPasswordUrl: 'url',
			})
			.expect(204);

		assert.isTrue(fakeMailer.exists({ subject: 'OCEMS: Recuperação de senha' }));
		assert.isTrue(fakeMailer.exists({ to: [{ address: user.email }] }));
		assert.isTrue(fakeMailer.exists({ from: { address: 'no-reply@ocems.com' } }));
		assert.isTrue(
			fakeMailer.exists({
				text: 'Clique no link abaixo para redefinir a sua senha.',
			})
		);

		fakeMailer.exists({ subject: 'OCEMS: Recuperação de senha' });

		Mail.restore();
	});

	group.beforeEach(async () => {
		await Database.beginGlobalTransaction();
	});

	group.afterEach(async () => {
		await Database.rollbackGlobalTransaction();
	});
});
