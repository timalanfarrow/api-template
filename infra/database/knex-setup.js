const pg = require( 'pg' );

const Knex = require( 'knex' );

const config = appRequire( 'config' );

let knex = null;

if ( !knex ) {
	knex = Knex( config );
}

module.exports = knex;
