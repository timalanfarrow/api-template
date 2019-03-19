import celebrate, { Joi } from '../../../helpers/celebrate';

export const singularValidator = celebrate( {
	params : Joi.object( {
		usersKey : Joi.number().required(),
	} ).unknown( false ),
} );

export const pluralValidator = celebrate( {
	params : Joi.object().unknown( false ),
} );
