require( 'apprequire' )( __dirname );
require( 'dotenv' ).config();

const server = appRequire( '/infra/web/server' );
const { knex }   = appRequire( '/infra/database/knex' );

// Connect to database
knex.raw( 'select 1+1 as result' )
	.then( () => {
		console.log( 'connected to db' );
	} )
	.catch( ( err ) => {
		console.log( 'not connected to db : ', err );
	} );


// Start server
server.start();
