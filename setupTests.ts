import server from './src/server';

beforeAll( () => {
	server.listen( 8912, () => {
		console.warn( `Running test server on port 8912` );
	} );
} );

// afterAll( () => {
// 	server.close();
// } );
