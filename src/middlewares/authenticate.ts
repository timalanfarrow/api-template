import admin from '../config/firebase';
import { Request, Response, NextFunction } from 'express';
import ResponseCode from '../helpers/responseCode';
import NamedError from '@juliancoleman/named-error';

export class FirebaseIdTokenFailedError extends NamedError { }

export default async function ( req : Request, res : Response, next : NextFunction ) {
	const authToken = req.get( 'Auth-Token' ) || '';

	const uid = await admin
		.auth()
		.verifyIdToken( authToken )
		.then( authUser => authUser.uid )
		.catch( ( { message } ) =>
			next( new FirebaseIdTokenFailedError( ResponseCode.Unauthorized, message ) )
		);

	if ( typeof uid !== 'string' ) {
		return next();
	}

	const authUser = await admin
		.database()
		.ref()
		.child( 'users' )
		.child( uid as string )
		.once( 'value' )
		.then( snapshot => snapshot.val() );

	if ( !authUser ) {
		return next( new FirebaseIdTokenFailedError( ResponseCode.BadRequest, 'Bad token.' ) );
	}

	res.locals.caller = { ...authUser, uid };
	return next();
}
