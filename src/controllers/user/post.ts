import * as express from 'express';
import { Request } from 'express-serve-static-core';

import User, { UserAlreadyExistsError } from '../../models/user';
import Crud from '../../lib/users/crud';
import Validator from '../../lib/users/post/validator';

import Status from '../../helpers/statuses';

const router = express.Router();

interface PostUserBody extends Request {
	readonly body : Partial<User>;
}

router.post(
	'/user',
	Validator,
	( { body } : PostUserBody, res, next ) => {
		Crud.createUser( body )
			.then( ( createdUser : User ) => res.status( 200 ).send( createdUser ) )
			.catch( UserAlreadyExistsError, next );
	}
);

export default router;
