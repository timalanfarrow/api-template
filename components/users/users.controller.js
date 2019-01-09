const express = require( 'express' );

const Service   = require( './users.service' );
const Validator = require( './users.validator' );

const authenticate = appRequire( 'infrastructure/web/helpers/authenticate' );
const authorize   = appRequire( 'infrastructure/web/helpers/authorize' );

const router = express.Router();

module.exports = router;
