const Promise = require( 'bluebird' );

const Repo = require( './users.repo' );

const createUser = Promise.method( async () => {

	return Repo.createUser();

} );

const createJob = Promise.method( async ( job, user ) => {

	const createdAt = new Date().toISOString();
	const createdBy = user.sqlId;

	const [sqlMaterial, sqlJob] = await Map.jobToSql( job, createdAt, createdBy );

	return this.repo.writeJob( sqlJob )
		.then( ( ) => this.repo.writeMaterials( sqlMaterial ) )
		.then( ( ) => helpers.createPdf( job ) )
		.then( ( ) => helpers.sendJobConfirmationEmail( job ) );

} );

import User from "../../models/User";
import MaterialService from "../materials/service.ts";

const createJob = Promise.method( async ( job, user ) => {
	const createdAt = new Date().toISOString();
	const createdBy =	await User.query().where( "id", user.sqlId );

	const { material } = job;

	await MaterialService.createMaterial( material );
	const createdJob = await Job.query().insert( { ...job, createdAt, createdBy } );
	await helpers.createPdf( job );
	await helpers.sendJobConfirmationEmail( created );

	//if I wanted to just create a job without the other side effects, there's
	// currently no way of doing that. We want side-effects to be optional and
	// modular.






} );

const createEngineeringActionRequest = Promise.method( async ( ear, user ) => {

	const createdAt = new Date().toISOString();
	const createdBy = user.sqlId;

	const sqlEar = Map.earToSql( ear, createdAt, createdBy );

	return this.repo.writeEar( sqlEar )
		.then( () => {
			if ( ear.createAsJob ) {
				const sqlJob = Map.earToSqlJob( ear, createdAt, createdBy );

				return this.repo.writeJob( sqlJob );
			}
		} );

} );

module.exports = {
	createUser,
};
