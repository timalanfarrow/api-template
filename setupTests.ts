import * as http from 'http';
import * as knexDbManager from 'knex-db-manager';

import server from './src/server';
import * as knexfile from './src/config/Knexfile';

let app : http.Server;

const dbManager = knexDbManager.databaseManagerFactory( { knex : knexfile } );

beforeAll( () => {
	// app = server.listen( 8912, () => {
	// 	console.warn( `Running test server on port 8912` );
	// } );

	app = http.createServer( server );

	app.listen( 8912, () => console.warn( `Test server listening on port 8912` ) );
} );

// https://github.com/facebook/jest/issues/1456#issuecomment-246205925
// afterAll( () => setTimeout( () => app.close( () => process.exit() ), 1000 ) );

afterAll( ( done ) => {
	dbManager.truncateDb( ['knex_migrations', 'knex_migrations_lock'] );
	// setTimeout( () => app.close( () => process.exit() ), 1000 );

	app.close();
	done();
} );
