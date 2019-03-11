const pg = require( 'pg' );

const Knex = require( 'knex' );

const { db } = appRequire( 'config' );

let knex = null;

if ( !knex ) {
	knex = Knex( db );
}

module.exports = knex;
