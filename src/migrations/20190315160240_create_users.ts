import * as Knex from 'knex';

exports.up = ( knex: Knex ): Promise<any[]> => Promise.all( [
	knex.schema.createTable( 'users', ( table: Knex.CreateTableBuilder ) => {
		table.integer( 'users_key' ).primary();
		table.string( 'email' );
		table.string( 'name' );
		table.integer( 'permission_level' );
		table.timestamps();
		table.timestamp( 'deleted_at' );
	} ),
] );

exports.down = ( knex: Knex ): Promise<any[]> => Promise.all( [
	knex.schema.dropTable( 'users' ),
] );
