import celebrate, { Joi } from '../../../helpers/celebrate';

export default celebrate( {
	body : Joi.object( {
		email           : Joi.string().required(),
		name            : Joi.string().required(),
		permissionLevel : Joi.number().valid( [1, 2, 3] ).required(),
	} ).unknown( false ),
} );
