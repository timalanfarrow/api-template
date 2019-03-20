require( 'dotenv' ).config();

import * as express from 'express';
import * as celebrate from 'celebrate';
import * as Knex from 'knex';
import { Model } from 'objection';

import expressRouteAutoloader from './middlewares/express-route-autoloader';

import * as Knexfile from './config/Knexfile';

const knex = Knex( Knexfile );
Model.knex( knex );

const app = express();

app.use( express.json() );
app.use( express.urlencoded( {
	extended : false,
} ) );

app.use( expressRouteAutoloader( `${__dirname}/controllers` ) );

app.use( celebrate.errors() );

app.use( ( err : any, _req, res, _next ) => {
	console.error( err );
	const { code, message } = err;

	if ( !err.isOperational ) {
		return res.status( err.code ).json( err );
	}

	return res.status( err.code ).send( err );
} );

process.on( 'unhandledRejection', ( reason : unknown ) => {
	console.error( reason );
} );

/**
 * At the time of writing this comment, Bluebird's
 * OperationalError only extends Error and does not add the
 * required `isOperational` field. It must be set to empty,
 * otherwise TS will complain that `isOperational` doesn't
 * exist on type Error.
 *
 */
process.on( 'uncaughtException', ( err : any ) => {
	if ( !err.isOperational ) {
		process.exit( 1 );
	}
} );

export default app;
