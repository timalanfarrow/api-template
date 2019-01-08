const express    = require( 'express' );
const bodyParser = require( 'body-parser' );
const Celebrate  = require( 'celebrate' );

const errorHandler = require( './middleware/errorHandler' );
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
app.use( errorHandler );

// Add Routes
routeLoader( 'components', app );

module.exports = app;
