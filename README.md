# Firebase Data Export
Exports all user and firestore data from Firebase into JSON or CSV format

## Getting started
Install:
- Node > 10
- Firebase cli (`npm install -g firebase-tools`)

You must also sign into Firebase from the cli (`firebase login`)

## Exporting your data
Open up the terminal / cmd prompt and CD to the root of this project. Run commands as per below.

### Exporting all data:
node export.js --project=project_name

### Exporting user data only:
node export.js --user-data --project=project_name

### Exporting user data only, without password hashes:
node export.js --user-data --no-hashes --project=project_name

### Exporting Firestore data only:
node export.js --firestore-data --project=project_name

### Exporting Firestore data from a single collection (top level collections only):
node export.js --firestore-data --collection "example_collection_name" --project=project_name
