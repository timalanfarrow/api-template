import { Router, Request } from 'express';

import User, { UserAlreadyExistsError } from '../../models/user';
import Crud from '../../lib/users/crud';
import Validator from '../../lib/users/post/validator';

import ResponseCode from '../../helpers/responseCode';
import Authenticate from '../../middlewares/authenticate';

const router = Router();

interface PostUserBody extends Request {
	readonly body : Partial<User>;
}

router.post(
	'/user',
	Validator,
	Authenticate,
	( { body } : PostUserBody, res, next ) => {
		Crud.createUser( body )
			.then( ( createdUser : User ) => res.status( ResponseCode.Created ).send( createdUser ) )
			.catch( UserAlreadyExistsError, next );
	}
);

export default router;
