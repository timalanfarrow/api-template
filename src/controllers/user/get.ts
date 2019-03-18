import * as express from 'express';
import { Request } from 'express-serve-static-core';

import User, { UserNotFoundError } from '../../models/user';
import Crud from '../../lib/users/crud';
import { singularValidator, pluralValidator } from '../../lib/users/get/validator';

import ResponseCode from '../../helpers/responseCode';

const router = express.Router();

router.get(
	'/user',
	pluralValidator,
	( _req, res, next ) => {
		Crud.getUsers()
			.then( ( users : User[] ) => res.status( ResponseCode.Ok ).send( users ) )
			.catch( next );
	}
);

interface GetUserParams extends Request {
	readonly params : {
		readonly usersKey : number;
	};
}

router.get(
	'/user/:usersKey',
	singularValidator,
	( { params } : GetUserParams, res, next ) => {
		Crud.getUser( params.usersKey )
			.then( ( user : User ) => res.status( ResponseCode.Ok ).send( user ) )
			.catch( UserNotFoundError, next );
	}
);

export default router;
