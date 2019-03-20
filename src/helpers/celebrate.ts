import { celebrate } from 'celebrate';
export { Joi } from 'celebrate';

const options = {
	abortEarly : false,
};

export default function ( schema ) {
	return celebrate( schema, options );
}
