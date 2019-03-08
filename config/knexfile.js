require( 'dotenv' ).config( { path : '../.env' } );

const Str = require( '../helpers/convert-string' );
const { HasProperty } = require( '../helpers/utils' );

const extraConfig = {
	postProcessResponse( result ) {
		// TODO:: further test and possibly make keysToCamelCase recursive.

		// this occurs after each query
		// is run. from my understanding
		// thus far, it can contain an array
		// of return values, an object of returned
		// values, an array of objects, or
		// simply a string.
		if ( typeof result !== 'object' ) {
			return result;
		}

		// this will convert an object's keys
		// from snake_case to camelCase or
		// immediately return if @param obj
		// is not an object.
		const keysToCamelCase = ( obj ) => {
			if ( typeof obj !== 'object' ) {
				return obj;
			}

			// convert our keys
			const keys = Object.keys( obj );
			const correctedKeys = keys.map( a => Str.snakeToCamel( a ) );

			// reconstruct the object
			return correctedKeys.reduce( ( corrected, key, i ) => {
				// use keys[i] so that it's the
				// original key, not the corrected
				// key
				const added = {};
				added[key]  = obj[keys[i]];

				return Object.assign( corrected, added );
			}, {} );
		};

		// apply this method to an array
		if ( Array.isArray( result ) ) {
			return result.map( item => keysToCamelCase( item ) );
		}

		// check if this comes from a raw
		// query and if so, apply it to the
		// rows paramater
		if ( HasProperty( result, '_getTypeParser' ) ) {
			const { rows } = result;

			const newRows = ( () => {
				if ( Array.isArray( rows ) ) {
					return rows.map( a => keysToCamelCase( a ) );
				}

				return keysToCamelCase( rows );
			} )();

			result.rows = newRows; // eslint-disable-line

			return result;
		}

		// apply this method to an object
		return keysToCamelCase( result );
	},

	wrapIdentifier( val, origImpl ) {
		// this occurs to each sql string
		// e.g. tables, column names, etc.
		// before a query is run, and converts
		// them from camelCase used in our JS
		// to the snake_case used in postgre.
		return origImpl( Str.camelToSnake( val ) );
	}
};

const config = {
	development : {
		client     : 'pg',
		connection : `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}_db_1:5432`,
		pool       : {
			min : 2,
			max : 10
		},
		migrations : {
			directory : `${__dirname}/infra/database/migrations`
		},
		seeds : {
			directory : `${__dirname}/infra/database/seeds`
		}
	},

	staging : {
		client     : 'pg',
		connection : `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}_db_1:5432`,
		pool       : {
			min : 2,
			max : 10
		},
		migrations : {
			directory : `${__dirname}/infra/database/migrations`,
		},
		seeds : {
			directory : `${__dirname}/infra/database/seeds`
		}
	},

	production : {
		client     : 'pg',
		connection : `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}_db_1:5432`,
		pool       : {
			min : 2,
			max : 10
		},
		migrations : {
			directory : `${__dirname}/infra/database/migrations`
		},
		seeds : {
			directory : `${__dirname}/infra/database/seeds`
		}
	}

};

Object.keys( config ).forEach( ( env ) => {
	const envConfig = config[env];

	Object.assign( envConfig, extraConfig );
} );

// Update with your config settings.
module.exports = config;
