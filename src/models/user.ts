import NamedError from '@juliancoleman/named-error';

import Base from './base';
import ResponseCode from '../helpers/responseCode';
import Status from '../helpers/statuses';

export class UserNotFoundError extends NamedError { }
export class UserAlreadyExistsError extends NamedError { }
export class InvalidEmailPasswordError extends NamedError { }

export default class User extends Base {
	static tableName = 'users';
	static idColumn = 'users_key';
	static NotFoundError = new UserNotFoundError( ResponseCode.NotFound, 'User not found.' );

	public readonly usersKey! : number;
	public email!             : string;
	public name               : string;
	public permissionLevel    : number;
	public status             : Status;

	static createNotFoundError() : UserNotFoundError {
		return this.NotFoundError;
	}
}
