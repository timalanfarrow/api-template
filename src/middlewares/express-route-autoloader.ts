/**
 * Express Route Autoloader
 *
 * An ExpressJS middleware that dynamically loads
 * controllers recursively from a user-specified directory.
 * Files that don't export a valid Express router are
 * simply ignored.
 *
 * Caveats:
 * * Controllers must use default export
 *
 * ! TODO: Publish this as a standalone NPM package
 */

import * as glob from 'glob';
import * as path from 'path';
import * as express from 'express';

const router = express.Router();

function isRoute( routeObject ) {
	if ( typeof routeObject === 'function' ) {
		return routeObject.prototype.constructor.name === 'router';
	}

	return false;
}

function pluckRoutes( routes : string[] ) {
	return routes
		.map( route => require( path.resolve( route ) ).default )
		.filter( isRoute );
}

export default function ( directory ) {
	const routes = glob.sync( `${directory}/**/*.ts` );
	const transformedRoutes = pluckRoutes( routes );

	transformedRoutes.forEach( route => router.use( route ) );

	return router;
}
