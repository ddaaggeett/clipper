const fs = require('fs')
const { fileData, audioFileExt } = require('../../../config')

const audioExpress = app => {
    app.patch('/patchAudioFile', (req, res) => {
        req.pipe(fs.createWriteStream(`${fileData.audio}/${Date.now()}.${audioFileExt}`));
        res.end('OK');
    });
}

module.exports = {
    audioExpress,
}
