import * as Bluebird from 'bluebird';
import * as objection from 'objection';
import * as Knex from 'knex';

import User, { UserAlreadyExistsError } from '../../models/user';
import Status from '../../helpers/statuses';
import ResponseCode from '../../helpers/responseCode';

const knex : Knex = User.knex();

export default class UserCrud {
	static getUsers = Bluebird.method( () => User.query() );

	static getUser = Bluebird.method( ( usersKey : number ) =>
		User.query()
			.findById( usersKey )
			.throwIfNotFound()
	);

	static createUser = Bluebird.method( async ( user : Partial<User> ) => {
		const { email } = user;
		const existingUser = await User
			.query()
			.first()
			.where( { email } );

		if ( existingUser ) {
			throw new UserAlreadyExistsError( ResponseCode.Conflict, 'Email already belongs to user' );
		}

		return objection.transaction( knex, trx =>
			User.query( trx ).insert( { ...user, status : Status.enabled } )
		);
	} );

	static updateUser = Bluebird.method( ( usersKey : number, user : Partial<User> ) =>
		User.query()
			.patchAndFetchById( usersKey, user )
			.throwIfNotFound()
	);

	static enableUser = Bluebird.method( ( usersKey : number ) =>
		UserCrud.updateUser( usersKey, { status : Status.enabled } )
	);

	static disableUser = Bluebird.method( ( usersKey : number ) =>
		UserCrud.updateUser( usersKey, { status : Status.disabled } )
	);
}
