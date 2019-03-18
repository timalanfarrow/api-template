import * as Knex from 'knex';
import * as Knexfile from './src/config/Knexfile';

const knex = Knex( Knexfile );

import server from './src/server';

let app;

beforeAll( () => {
	app = server.listen( 8912, () => {
		console.warn( `Running test server on port 8912` );
	} );
} );


// https://github.com/facebook/jest/issues/1456#issuecomment-246205925
afterAll( () => setTimeout( () => app.close( () => process.exit() ), 1000 ) );
