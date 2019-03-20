// https://vincit.github.io/objection.js/#snake-case-to-camel-case-conversion
// Do not use Objection's internal snake-case mappers
// https://github.com/tgriesser/knex/issues/2644

/**
 * Eventually switch from using underscore.string
 * to using @juliancoleman/orchestra. Also stop using Ramda.
 */

import { renameKeysWith } from 'ramda-adjunct';
import { underscored, camelize } from 'underscore.string';
import { Model } from 'objection';

export default abstract class Base extends Model {
	$formatDatabaseJson( json ) {
		const formattedJson = super.$formatDatabaseJson( json );
		return renameKeysWith( underscored, formattedJson );
	}

	$parseDatabaseJson( json ) {
		return super.$parseDatabaseJson(
			renameKeysWith( camelize, json )
		);
	}
}
