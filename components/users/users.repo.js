// Interacts with the db
const Promise = require( 'bluebird' );

const Mapper = require( './users.mapper' );

const createUser = Promise.method( async () => {

	// Maps frontend model to db model
	Mapper.toDatabase();

	return 'No yet implemented';

} );

module.exports = {
	createUser,
};
