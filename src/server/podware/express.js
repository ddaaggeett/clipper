const fs = require('fs')
const { audioFileExt } = require('../../../config')
const functions = require('../functions')

const podware = functions.getAppObject('podware')

const podwareExpress = app => {
    app.patch('/patchAudioFile', (req, res) => {
        req.pipe(fs.createWriteStream(`${podware.fileData}/${Date.now()}.${audioFileExt}`));
        res.end('OK');
    });
}

module.exports = podwareExpress
