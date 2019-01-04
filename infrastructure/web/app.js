const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const app = express();

// parse all of our requests into JSON
app.use( bodyParser.json() );

// has to do with library extension. Must be false
app.use( bodyParser.urlencoded( {
	extended : false,
} ) );

// Add Error handler

// Add Routes

module.exports = app;
