import { celebrate, Joi } from 'celebrate';

export default celebrate( {
	body : Joi.object( {
		email           : Joi.string().required(),
		name            : Joi.string().required(),
		permissionLevel : Joi.number().valid( [1, 2, 3] ).required(),
		status          : Joi.string().valid( ['enabled', 'disabled'] ).required(),
	} ).unknown( false ),
} );
