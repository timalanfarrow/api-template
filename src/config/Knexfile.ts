import * as dotenv from 'dotenv';

dotenv.config( { path : '../../.env' } );

import { Config, PoolConfig, MigratorConfig } from 'knex';
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
const connection = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432`;

// TypeScript doesn't play nicely with Knexfiles. We will
// just need to use `module.exports` instead of using
// TypeScript's module resolution syntax.
module.exports = <Config> {
	client,
	connection,
	migrations,
	pool,
};
