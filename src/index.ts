import * as cluster from 'cluster';
import * as os from 'os';

import server from './server';

const DEFAULT_PORT : number = 3000;
const port : number = parseInt( process.env.PORT, 10 ) || DEFAULT_PORT;

// A single instance of NodeJS runs in a single thread.To
// take advantage of multi-core systems, the user will
// sometimes want to launch a cluster of NodeJS processes
// to handle the load.
//
// The cluster module allows easy creation of child
// processes that all share server ports.
// https://nodejs.org/api/cluster.html#cluster_cluster

// if ( cluster.isMaster ) {

// 	// Fork workers.
// 	for ( const core of os.cpus() ) {
// 		cluster.fork();
// 	}

// 	cluster.on( 'exit', ( worker, _code, _signal ) =>
// 		console.warn( `worker ${worker.process.pid} died.` )
// 	);

// } else {
	server.listen( port, () => {
		/**
		 * Display a helpful warning to the user when
		 * attempting to use Docker and the PORT environment
		 * variable isn't set. This warning, if the project is
		 * configured correctly, should only appear when
		 * running `yarn dev`. It should not appear in Docker.
		 */
		if ( port === DEFAULT_PORT ) {
			console.warn( '\x1b[33m', ' API is running on the default port.\n' );
		}

		console.info( `Server listening at ${port}` );
	} );
// }
