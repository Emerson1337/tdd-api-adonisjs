import { UserFactory } from './../../database/factories/index';
import test from 'japa';
import supertest from 'supertest';
import Database from '@ioc:Adonis/Lucid/Database';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('User', (group) => {
	test('It should be able to create an user', async (assert) => {
		const userPayload = {
			email: 'test@test.com',
			username: 'user',
			password: '123',
			avatar:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(201);

		assert.exists(body.user, 'User undefined');
		assert.exists(body.user.id, "Id doesn't exists");
		assert.equal(body.user.email, userPayload.email);
		assert.equal(body.user.username, userPayload.username);
		assert.equal(body.user.avatar, userPayload.avatar);
	});

	test('It not should be able to create an user because email already exists', async (assert) => {
		const { email, password, avatar } = await UserFactory.create();

		const userPayload = {
			email,
			username: 'teste',
			password,
			avatar,
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(409);

		assert.include(body.message, 'email');
		assert.equal(body.code, 'BAD_REQUEST');
		assert.equal(body.status, 409);
	});

	group.beforeEach(async () => {
		await Database.beginGlobalTransaction();
	});

	group.afterEach(async () => {
		await Database.rollbackGlobalTransaction();
	});
});
