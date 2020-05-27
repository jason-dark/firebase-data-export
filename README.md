# Firebase Data Export
Exports all user and firestore data from Firebase into JSON or CSV format

## Getting started
Install:
- Node > 10
- Firebase cli (`npm install -g firebase-tools`)

Open up this project's root directory, then:
- Run `npm install`

Place a service account for your Firebase account in the root of the project directory. It has to be named `service-account.json`

You must also sign into Firebase from the cli (`firebase login`)

## Exporting your data
Open up the terminal / cmd prompt and CD to the root of this project. Run this command:

`node export.js --project=project_name`

