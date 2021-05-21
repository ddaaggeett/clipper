const fs = require('fs')
const path = require('path')
const downloadVideo = require('./downloadVideo')
const ffmpeg = require('./ffmpeg')
const { videoDataDirectory } = require('../../config')

const generateClip = (clipObject) => {
    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(videoDataDirectory, clipObject.videoID)
        const clipDirectory = path.join(videoDirectory, clipObject.id)
        fs.mkdir(clipDirectory,{recursive:true}, err => {
            if (err) throw err;
            else {
                downloadVideo(videoDirectory, clipObject.videoID).then(() => {
                    ffmpeg(clipDirectory, clipObject).then(updatedClipObject => resolve(updatedClipObject))
                })
            }
        })
    })
}

module.exports = generateClip
