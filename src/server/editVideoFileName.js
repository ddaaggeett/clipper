const { videoDataDirectory } = require('../../config')
var fs = require('fs')

const editVideoFileName = (clipObject) => {
    const videoDirectory = videoDataDirectory + clipObject.videoId + '/'
    const filenameString = clipObject.title.split(' ').join('_')
    const newVideoFile = videoDirectory + clipObject.timestamp + '_' + filenameString + '.mp4'
    try{
        fs.readdirSync(videoDirectory).forEach((file, i) => {
            if(file.includes(clipObject.timestamp)) {
                const oldVideoFile = videoDirectory + file
                fs.renameSync(oldVideoFile, newVideoFile)
            }
        })
    }
    catch(error) {
        if(error.toString().includes('ENOENT: no such file or directory')) throw ('ENOENT: no such file or directory')
        else console.log(error)
    }
}

module.exports = editVideoFileName
