const Joi = require( 'joi' );
const { celebrate } = require( 'celebrate' );

const createUser = celebrate( {
	body : Joi.object().keys( {

	} ),
} );

const deleteUser = celebrate( {
	body : Joi.object().keys( {

	} ),
} );

const updateUser = celebrate( {
	body : Joi.object().keys( {

	} ),
} );

module.exports = {
	createUser,
	deleteUser,
	updateUser
}
