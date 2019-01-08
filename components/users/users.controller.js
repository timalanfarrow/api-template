const express = require( 'express' );

const Service   = require( './users.service' );
const Validator = require( './users.validator' );

const authenticate = appRequire( 'infrastructure/web/middleware/authenticate' );
const authorize   = appRequire( 'infrastructure/web/middleware/authorize' );

const router = express.Router();



