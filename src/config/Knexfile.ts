import { Config, PoolConfig, MigratorConfig, ConnectionConfig } from 'knex';
import * as pg from 'pg';

const numberTypes : number[] = [700, 701, 20, 20, 1021, 1022, 1231];
numberTypes.forEach( type =>
	pg.types.setTypeParser( type, 'text', parseFloat )
);

const client = 'pg';
const pool : Readonly<PoolConfig> = { min : 2, max : 10 };
const migrations : Readonly<MigratorConfig> = {
	directory           : '../migrations',
	disableTransactions : true,
};

// Do not set any defaults on these environment variables.
// Let dotenv fail silently and let the database fail to
// connect.
const connection : ConnectionConfig = {
	host     : process.env.DATABASE_HOST,
	database : process.env.DATABASE_NAME,
	password : process.env.DATABASE_PASSWORD,
	user     : process.env.DATABASE_USER,
};

// TypeScript doesn't play nicely with Knexfiles. We will
// just need to use `module.exports` instead of using
// TypeScript's module resolution syntax.
module.exports = <Config> {
	client,
	connection,
	migrations,
	pool,
};
