import celebrate, { Joi } from '../../../helpers/celebrate';

export default celebrate( {
	body : Joi.object( {
		email           : Joi.string(),
		name            : Joi.string(),
		permissionLevel : Joi.number().valid( [1, 2, 3] ),
		status          : Joi.string().valid( ['enabled', 'disabled'] ),
	} ).unknown( false ),
} );
