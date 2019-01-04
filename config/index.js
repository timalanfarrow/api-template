const fs = require( 'fs' );
const path = require( 'path' );

const env = process.env.NODE_ENV || 'development';

const envConfig = appRequire( `config/environments/${env}.js` );

// Setup db config
const dbConfig = {};

const config = Object.assign( {
	env,
	db : dbConfig
}, envConfig );

module.exports = config;
