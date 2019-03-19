import { Router, Request } from 'express';

import User, { UserNotFoundError } from '../../models/user';
import Crud from '../../lib/users/crud';
import Validator from '../../lib/users/put/validator';

import ResponseCode from '../../helpers/responseCode';
import Authenticate from '../../middlewares/authenticate';

const router = Router();

interface PostUserBody extends Request {
	readonly params : {
		readonly usersKey : number;
	};
	readonly body : Partial<User>;
}

router.put(
	'/user/:usersKey',
	Validator,
	Authenticate,
	( { body, params } : PostUserBody, res, next ) => {
		Crud.updateUser( params.usersKey, body )
			.then( ( createdUser : User ) => res.status( ResponseCode.Ok ).send( createdUser ) )
			.catch( UserNotFoundError, next );
	}
);

export default router;
