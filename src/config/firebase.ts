import * as admin from 'firebase-admin';

import * as ServiceAccount from './service-account.json';

export const serviceAccount = {
	credential  : admin.credential.cert( ServiceAccount as any ),
	databaseURL : 'https://fid-access-replacement.firebaseio.com',
};

admin.initializeApp( serviceAccount );

export default admin;
