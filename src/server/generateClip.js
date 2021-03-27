const {
    exec,
} = require('child_process')
const fs = require('fs')
const path = require('path')
const downloadVideo = require('./downloadVideo')
const clip = require('./clip')
const { videoDataDirectory } = require('../../config')

const generateClip = (clipObject) => {
    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(videoDataDirectory, clipObject.videoId)
        fs.mkdir(videoDirectory,{recursive:true}, err => {
            if (err) throw err;
            else {
                downloadVideo(videoDirectory, clipObject.videoId).then(() => {
                    clip(videoDirectory, clipObject).then(updatedClipObject => resolve(updatedClipObject))
                })
            }
        })
    })
}

module.exports = generateClip
