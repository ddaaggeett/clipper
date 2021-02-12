const { videoDataDirectory } = require('../../config')
var fs = require('fs')

const editVideoFileName = (clipObject) => {
    const videoDirectory = videoDataDirectory + clipObject.videoId + '/'
    const filenameString = clipObject.title.split(' ').join('_')
    const newVideoFile = videoDirectory + clipObject.timestamp + '_' + filenameString + '.mp4'
    fs.readdirSync(videoDirectory).forEach((file, i) => {
        if(file.includes(clipObject.timestamp)) {
            const oldVideoFile = videoDirectory + file
            fs.renameSync(oldVideoFile, newVideoFile)
        }
    })
}

module.exports = editVideoFileName
