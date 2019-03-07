const env = process.env.NODE_ENV || 'development';

const config = appRequire( `config/environments/${env}.js` );
const database = appRequire( 'knexfile' )[env];

module.exports = Object.assign( {
	db : database
}, config );
