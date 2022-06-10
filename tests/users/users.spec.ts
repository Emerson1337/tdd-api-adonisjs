import Database from '@ioc:Adonis/Lucid/Database';
import { assert } from '@japa/preset-adonis';
import test from 'japa';
import supertest from 'supertest';

import { UserFactory } from './../../database/factories/index';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('User', (group) => {
	test('It should be able to create an user', async (assert) => {
		const userPayload = {
			email: 'test@test.com',
			username: 'user',
			password: '1234',
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

	test('It not should be able to create an user because username already exists', async (assert) => {
		const { username, password, avatar } = await UserFactory.create();

		const userPayload = {
			email: 'test@gmail.com',
			username,
			password,
			avatar,
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(409);

		assert.include(body.message, 'username');
		assert.equal(body.code, 'BAD_REQUEST');
		assert.equal(body.status, 409);
	});

	test('It should return 422 when required data is not provided', async (assert) => {
		const { body } = await supertest(BASE_URL).post('/users').send({}).expect(422);

		assert.equal(body.code, 'BAD_REQUEST');
		assert.equal(body.status, 422);
	});

	test('It should return 422 when email is invalid', async (assert) => {
		const userPayload = {
			email: 'testtest.com',
			username: 'user',
			password: '1234',
			avatar:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(422);

		assert.equal(body.code, 'BAD_REQUEST');
		assert.equal(body.status, 422);
	});

	test('It should return 422 when username isnt provided', async (assert) => {
		const userPayload = {
			email: 'testtest.com',
			password: '1234',
			avatar:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(422);

		assert.equal(body.code, 'BAD_REQUEST');
		assert.equal(body.status, 422);
	});

	test('It should return 422 when password is too short', async (assert) => {
		const userPayload = {
			email: 'testtest.com',
			username: 'user',
			password: '123',
			avatar:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(422);

		assert.equal(body.code, 'BAD_REQUEST');
		assert.equal(body.status, 422);
	});

	test('It not should be able to update an user', async (assert) => {
		const { secure_id, password } = await UserFactory.create();

		const email = 'newemail@user.com';
		const avatar = 'https://github.com/emerson1337.png';

		const userPayload = {
			email,
			password,
			avatar,
		};

		const { body } = await supertest(BASE_URL)
			.put(`/users/${secure_id}`)
			.send(userPayload)
			.expect(200);

		assert.exists(body.user, 'User undefined');
		assert.equal(body.user.email, email);
		assert.exists(body.user.avatar, avatar);
		assert.exists(body.user.secure_id, secure_id);
	});

	group.beforeEach(async () => {
		await Database.beginGlobalTransaction();
	});

	group.afterEach(async () => {
		await Database.rollbackGlobalTransaction();
	});
});
