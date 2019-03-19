import admin from '../config/firebase';
import { Request, Response, NextFunction } from 'express';
import ResponseCode from '../helpers/responseCode';

export default async function ( req : Request, res : Response, next : NextFunction ) {
	const authToken = req.get( 'Auth-Token' );

	const uid = await admin
		.auth()
		.verifyIdToken( authToken )
		.then( authUser => authUser.uid )
		.catch( ( err ) => {
			// We can return a plain object here because we have
			// a function on the frontend that reads this
			// specific object and if the response code is not
			// in the 200's, an error is generated when the
			// request finishes.

			return res.status( ResponseCode.Unauthorized ).send( {
				status   : ResponseCode.Unauthorized,
				message  : 'Unauthorized.',
				error    : err,
			} );
		} );

	if ( typeof uid !== 'string' ) {
		return next();
	}

	const authUser = await admin
		.database()
		.ref()
		.child( 'users' )
		.child( uid )
		.once( 'value' )
		.then( snapshot => snapshot.val() );

	if ( !authUser ) {
		return res.status( ResponseCode.BadRequest ).send( {
			message : 'Bad token.'
		} );
	}

	res.locals.caller = { ...authUser, uid };
	return next();
}
