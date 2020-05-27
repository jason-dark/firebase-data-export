const os = require('os');
const client = require('firebase-tools');
const fs = require('fs');
const path = require('path');

module.exports = async (project) => {
    try {
        const time = new Date().toLocaleString().replace(/ /g,"_").replace(/,/g,"").replace(/\//g,"-").replace(/:/g,".")
        const filePath = `${os.tmpdir()}/${time}.json`;
        await client.auth.export(filePath, { project: project });
        const data = JSON.parse(fs.readFileSync(filePath));
        fs.unlinkSync(filePath);
        return data;
    } catch (err) {
        throw `Error getting Firebase user auth data: ${err}`;
    }
}