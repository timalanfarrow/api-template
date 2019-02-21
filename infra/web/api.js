const express    = require( 'express' );
const bodyParser = require( 'body-parser' );
const Celebrate  = require( 'celebrate' );

const errorHandler = require( './helpers/errorHandler' );
const routeLoader  = require( './helpers/routeLoader' );

const app = express();

// parse all of our requests into JSON
app.use( bodyParser.json() );

// has to do with library extension. Must be false
app.use( bodyParser.urlencoded( {
	extended : false,
} ) );

// Add Error handler
app.use( Celebrate.errors() );

app.use( ( err, req, res, next ) => {

	errorHandler( err );

	// Programming errors
	if ( !err.isOperational ) {
		return res.status( 500 ).send( err );
	}

	res.status( err.status ).send( err );

} );

process.on( 'unhandledRejection', ( reason ) => {
	throw reason;
} );

process.on( 'uncaughtException', ( err ) => {
	errorHandler( err );

	if ( !err.isOperational ) {
		process.exit( 1 );
	}

} );

// Add Routes
routeLoader( 'components', app );

module.exports = app;
