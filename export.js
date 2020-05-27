const fs = require('fs');
const os = require('os');
const argv = require('minimist')(process.argv.slice(2));
const json2csvAsync = require('json-2-csv').json2csvAsync;

const getFirestoreData = require('./src/get-firestore-data');
const getUserAuthData = require('./src/get-user-auth-data');


(async () => {
    try {
        if (! 'project' in argv || !argv.project) {
            throw ('You must specify a Firebase Project id using --project="name"');
        }

        let dataProms = [getUserAuthData(argv.project), getFirestoreData()];

        const data = await Promise.all(dataProms);
        const userAuthData = data[0].users;
        const userFirestoreData = data[1];
        const mapping = [];

        userAuthData.forEach(user => {
            const id = user.localId;
            const userResult = {
                email: 'email' in user ? user.email : '',
                id: id,
                emailVerified: 'emailVerified' in user ? user.emailVerified : '',
                displayName: 'displayName' in user ? user.displayName : '',
                lastSignedInAt: 'lastSignedInAt' in user ? new Date(Number(user.lastSignedInAt)).toDateString() : '',
                createdAt: 'createdAt' in user ? new Date(Number(user.createdAt)).toDateString() : '',
                disabled: 'disabled' in user ? user.disabled : ''
            };

            if (id && id in userFirestoreData) {
                for (let [key, value] of Object.entries(userFirestoreData[id])) {
                    if (key !== '__collections__') {
                        userResult[key] = value;
                    }
                }
            }

            mapping.push(userResult);
        })

        const fileName = new Date().toLocaleString().replace(/ /g,"_").replace(/,/g,"").replace(/\//g,"-").replace(/:/g,".");
        const csv = await json2csvAsync(mapping, { emptyFieldValue: '' });

        const filePath = `${os.homedir()}/Desktop/demurodas_firebase_exports/`;
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        fs.writeFileSync(`${filePath}/${fileName}.csv`, csv);

    } catch (err) {
        console.error(err);
    }
})();;