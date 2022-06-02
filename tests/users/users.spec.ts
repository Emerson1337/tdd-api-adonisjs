import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('User', () => {
	test.only('It should be able to create an user', async (assert) => {
		const userPayload = {
			email: 'test@test.com',
			username: 'user',
			password: '123',
			avatar:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
		};

		const { body } = await supertest(BASE_URL).post('/users').send(userPayload).expect(201);

		assert.exists(body.user, 'User undefined');
		assert.exists(body.id, "Id doesn't exists");
		assert.equal(body.email, userPayload.password);
		assert.equal(body.username, userPayload.username);
		assert.equal(body.avatar, userPayload.avatar);
	});
});
