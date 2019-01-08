const app = require( './api' );

const config = appRequire( 'config' );

// Set up server settings

const start = () => new Promise( ( resolve ) => {

	const { port } = config;

	app.listen( port, () => {
		console.log( `Listening at port ${port}` );
		resolve();
	} );

} );

module.exports = {
	start
};
