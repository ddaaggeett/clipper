/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
const fs = require('fs')
const path = require('path')
const youtube = require('./youtube-dl')
const ffmpeg = require('./ffmpeg')
const { videoDataDirectory } = require('../../config')

const generateClip = (clipObject) => {
    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(videoDataDirectory, clipObject.videoID)
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
