const path = require('path')
const { exec } = require('child_process')
const { videoDataDirectory } = require('../../config')

const getThumbnail = (clipObject) => {

    const videoDirectory = path.join(videoDataDirectory, clipObject.videoId)

    const command = 'ffmpeg -i ' + path.basename(videoDirectory) + '.mp4 -vframes 1 -an -s 1280x720 -ss ' + clipObject.thumbnailTime + ' ' + clipObject.id + '_thumbnail.jpg'

    exec(command, {
        cwd: videoDirectory,
    }, (error, stdout, stderr) => {
        if(error) console.log(error)
    })
}

module.exports = {
    getThumbnail,
}
