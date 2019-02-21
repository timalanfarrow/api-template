require( 'apprequire' )( __dirname );
require( 'dotenv' ).config();

const server   = appRequire( '/infrastructure/web/server' );
const database = appRequire( '/infrastructure/database/sql' );

// Connect to database

// Start server
server.start();
