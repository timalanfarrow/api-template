const { celebrate } = require( 'celebrate' );

const options = {
	abortEarly : false,
};

module.exports = schema => celebrate( schema, options );
