import User from '../../models/user';
import Crud from './crud';

describe( 'Crud', () => {
	describe( '#getUsers()', () => {
		it( 'returns an array of all users in database', async () => {
			const users : User[] = await Crud.getUsers();
			expect( users ).toHaveLength( 2 ); // ! TODO: this obviously won't always be the case
		} );
	} );
} );
