import User from '../../models/user';
import * as Bluebird from 'bluebird';

export default class {
	static getUsers = Bluebird.method( () =>
		User.query()
	);

	static getUser = Bluebird.method( usersKey =>
		User.query()
			.findById( usersKey )
			.throwIfNotFound()
	);
}
