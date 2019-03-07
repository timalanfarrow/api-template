const express = require( 'express' );

const Service   = require( './users.service' );
const Validator = require( './users.validator' );

const authenticate = appRequire( 'infra/web/helpers/authenticate' );
const authorize   = appRequire( 'infra/web/helpers/authorize' );

const router = express.Router();

router.post(
	'/user',

	authenticate,

	( req, res, next ) => {

		Service.createUser()
			.then( data => res.status( 200 ).send( data ) )
			.catch( err => next( err ) );
	}
);

module.exports = router;
