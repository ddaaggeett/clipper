const { dbConnxConfig, videoDataDirectory } = require('../../config')
const fs = require('fs')
const path = require('path')
const r = require('rethinkdb')

const editVideoFileName = (clipObject) => {
    const videoDirectory = path.join(videoDataDirectory, clipObject.videoId)
    const filenameString = clipObject.title.split(' ').join('_')
    const newVideoFile = path.join(videoDirectory, clipObject.timestamp + '_' + filenameString + '.mp4')
    try{
        fs.readdirSync(videoDirectory).forEach((file, i) => {
            if(file.includes(clipObject.timestamp)) {
                const oldVideoFile = path.join(videoDirectory, file)
                fs.rename(oldVideoFile, newVideoFile, () => {
                    const updatedClipObject = {
                        ...clipObject,
                        videoFilePath: newVideoFile
                    }
                    r.connect(dbConnxConfig).then(connection => {
                        r.table('clips').update(updatedClipObject).run(connection)
                    })
                })
            }
        })
    }
    catch(error) {
        if(error.toString().includes('ENOENT: no such file or directory')) throw ('ENOENT: no such file or directory')
        else console.log(error)
    }
}

module.exports = editVideoFileName
