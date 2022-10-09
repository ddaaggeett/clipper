const fs = require('fs')
var { dbConnxConfig } = require('../../../config')
const r = require('rethinkdb')
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
                youtube.downloadVideo(videoDirectory, clipObject.videoID).then(downloaded => {
                    if (downloaded) {
                        ffmpeg.executeClip(clipDirectory, clipObject).then(updatedClipObject =>
                         {
                             resolve(updatedClipObject)
                         })
                    }
                    else {
                        r.connect(dbConnxConfig).then(connection => {
                            r.table('clips').get(clipObject.id).run(connection).then(storedClip => {
                                resolve(storedClip)
                            }).error(error => {
                                console.log(`\nget clip object error\n${error}`)
                            })
                        })
                    }
                })
            }
        })
    })
}

module.exports = generateClip
