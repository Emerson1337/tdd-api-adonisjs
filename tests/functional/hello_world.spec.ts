import test from 'japa';

test.group('Example', () => {
	test('assert sum', (assert) => {
		assert.equal(2 + 2, 4);
		// const response = await client.get('/');
		// response.assertStatus(200);
		// response.assertBodyContains({ hello: 'world' });
	});
});
