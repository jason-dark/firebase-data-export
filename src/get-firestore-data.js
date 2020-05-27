const serviceAccount = require('../service-account.json');
const admin = require('firebase-admin');
const firestoreExport = require('node-firestore-import-export').firestoreExport;

module.exports = async () => {
    try {
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        const data = await firestoreExport(admin.firestore().collection('users'));

        if ('__collections__' in data) {
            return data['__collections__'];
        }

        return data;
    } catch (err) {
        throw `Error getting Firestore data: ${err}`;
    }
}