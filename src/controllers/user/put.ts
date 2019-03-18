import * as express from 'express';
import { Request } from 'express-serve-static-core';

import User, { UserNotFoundError } from '../../models/user';
import Crud from '../../lib/users/crud';
import Validator from '../../lib/users/put/validator';

import ResponseCode from '../../helpers/responseCode';

const router = express.Router();

interface PostUserBody extends Request {
	readonly params : {
		readonly usersKey : number;
	};
	readonly body : Partial<User>;
}

router.put(
	'/user/:usersKey',
	Validator,
	( { body, params } : PostUserBody, res, next ) => {
		Crud.updateUser( params.usersKey, body )
			.then( ( createdUser : User ) => res.status( ResponseCode.Ok ).send( createdUser ) )
			.catch( UserNotFoundError, next );
	}
);

export default router;
