import * as Bluebird from 'bluebird';

import Crud from './crud';

import User, { UserAlreadyExistsError, UserNotFoundError } from '../../models/user';
import Status from '../../helpers/statuses';

const usersKey : number = 1;

describe( 'Crud', () => {
	describe( '#createUser()', () => {
		it( 'successfully creates a user', async ( done ) => {
			const user : User = await Crud.createUser( {
				name            : 'Tim Farrow',
				email           : 'tim@jetstechnologies.com',
				permissionLevel : 3,
			} );

			expect( user.name ).toBe( 'Tim Farrow' );
			done();
		} );

		it( 'throws an error if another user is created with an existing email address', ( done ) => {
			const user : Bluebird<User> = Crud.createUser( {
				name            : 'Already Taken',
				email           : 'tim@jetstechnologies.com',
				permissionLevel : 3,
			} );

			expect( user ).rejects.toThrowError( UserAlreadyExistsError );
			done();
		} );
	} );

	describe( '#getUsers()', () => {
		it( 'returns an array of all users in database', async ( done ) => {
			const users : User[] = await Crud.getUsers();

			expect( users ).toHaveLength( 1 );
			done();
		} );
	} );

	describe( '#getUser()', () => {
		it( 'returns a user by its usersKey', async ( done ) => {
			const user : User = await Crud.getUser( usersKey );

			expect( user.name ).toBe( 'Tim Farrow' );
			done();
		} );

		it( 'throws if a user cannot be found', () => {
			const user : Bluebird<User> = Crud.getUser( 9999999 );
			expect( user ).rejects.toThrowError( UserNotFoundError );
		} );
	} );

	describe( '#updateUser()', () => {
		it( 'updates a user and returns the patched user', async ( done ) => {
			const updatedUser : User = await Crud.updateUser( usersKey, { permissionLevel : 2 } );

			expect( updatedUser.permissionLevel ).toBe( 2 );
			done();
		} );
	} );

	describe( '#disableUser()', () => {
		it( 'successfully disables a user', async ( done ) => {
			const disabledUser : User = await Crud.disableUser( usersKey );

			expect( disabledUser.status ).toBe( Status.disabled );
			done();
		} );
	} );

	describe( '#enableUser()', () => {
		it( 'enables the user we just disabled', async ( done ) => {
			const enabledUser : User = await Crud.enableUser( usersKey );

			expect( enabledUser.status ).toBe( Status.enabled );
			done();
		} );
	} );
} );
