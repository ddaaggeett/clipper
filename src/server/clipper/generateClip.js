const fs = require('fs')
const path = require('path')
const youtube = require('./youtube')
const ffmpeg = require('./ffmpeg')
const functions = require('../functions')

const clipper = functions.getAppObject('clipper')

const generateClip = (clipObject) => {
    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(clipper.fileData, clipObject.videoID)
        const clipDirectory = path.join(videoDirectory, clipObject.id)
        fs.mkdir(clipDirectory,{recursive:true}, err => {
            if (err) throw err;
            else {
                youtube.downloadVideo(videoDirectory, clipObject.videoID).then(() => {
                    ffmpeg.executeClip(clipDirectory, clipObject).then(updatedClipObject => resolve(updatedClipObject))
                })
            }
        })
    })
}

module.exports = generateClip
