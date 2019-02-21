const fs      = require( 'fs' );
const express = require( 'express' );

const router = express.Router();

const loadRoutes = ( path, app ) => {

	fs.readdirSync( path ).forEach( ( item ) => {
		const subDir = `${path}/${item}`;

		const controllerPath = `${subDir}/${item}.controller.js`;

		if ( fs.existsSync( controllerPath ) ) {
			router.use( appRequire( controllerPath ) );
			return;
		}

		console.log( `${item} Component missing controller file` );

	} );

	app.use( router );

};

module.exports = loadRoutes;
