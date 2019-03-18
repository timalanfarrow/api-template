import * as admin from 'firebase-admin';

export const serviceAccount = {
	credential : admin.credential.cert( {
		projectId   : process.env.FIREBASE_PROJECT_ID,
		clientEmail : process.env.FIREBASE_CLIENT_EMAIL,
		privateKey  : process.env.FIREBASE_PRIVATE_KEY,
	} ),
	databaseURL : process.env.FIREBASE_DATABASE_URL,
};

admin.initializeApp( serviceAccount );

export default admin;
