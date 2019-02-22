const Promise = require( 'bluebird' );

const Repo = require( './users.repo' );

const createUser = Promise.method( async () => {

	return Repo.createUser();

} );

module.exports = {
	createUser,
};
