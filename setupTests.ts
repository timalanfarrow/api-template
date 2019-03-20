// if ( process.env.NODE_ENV === 'production' ) {
// 	console.warn( 'Test should not be run in production' );
// 	console.warn( 'Gracefully shutting down.' );
// 	process.exit( 0 );
// }

import * as http from 'http';
import * as knexDbManager from 'knex-db-manager';

import server from './src/server';
import * as knexfile from './src/config/Knexfile';

let app;

const dbManager : knexDbManager.PostgresDatabaseManager = knexDbManager.databaseManagerFactory( { knex : knexfile } );

beforeAll( () => {
	// app = server.listen( 8912, () => {
	// 	console.warn( `Running test server on port 8912` );
	// } );

	app = http.createServer( server );
	app = require( 'http-shutdown' )( app );

	app.listen( 8912, () => console.warn( `Test server listening on port 8912` ) );
} );

// https://github.com/facebook/jest/issues/1456#issuecomment-246205925
// afterAll( () => setTimeout( () => app.close( () => process.exit() ), 1000 ) );

afterAll( ( done ) => {
	dbManager.truncateDb( ['knex_migrations', 'knex_migrations_lock'] );
	// setTimeout( () => app.close( () => process.exit() ), 1000 );

	app.shutdown();
	done();
} );
