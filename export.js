const shell = require('shelljs');
const argv = require('minimist')(process.argv.slice(2));
global.GOOGLE_APPLICATION_CREDENTIALS = './service-account.json';

(async () => {
    try {
        if (! 'project' in argv && !argv.project) {
            throw ('You must specify a Firebase Project id using --project="name"');
        }

        shell.exec(`firebase use ${argv.project}`);

        // let getUserData = false;
        // if ('user-data' in argv && argv['user-data'] !== 'false') {
        //     dataProms.push()
        // }

        // let getFirestoreData = false;
        // if ('firestore-data' in argv && argv['firestore-data'] !== 'false') {
        //     getFirestoreData = true;
        // }

        




        console.log(argv);
    } catch (err) {
        console.error(err);
    }
})();;