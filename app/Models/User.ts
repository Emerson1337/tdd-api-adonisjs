import Hash from '@ioc:Adonis/Core/Hash';

import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuid } from 'uuid';

export class User extends BaseModel {
	@column({ isPrimary: true })
	public id: string;

	@column()
	public secure_id: string;

	@beforeCreate()
	public static createUUID(user: User) {
		user.secure_id = uuid();
	}

	@column()
	public email: string;

	@column()
	public username: string;

	@column()
	public password: string;

	@column()
	public avatar: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}
