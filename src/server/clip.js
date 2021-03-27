const { exec } = require('child_process')
const fs = require('fs')
var { dbConnxConfig } = require('../../config')
var r = require('rethinkdb')
const path = require('path')

const clip = (videoDirectory, clipObject) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clipObject.id).run(connection).then(storedClip => {
                // clip may have been edited before file finished downloading, so get what was stored
                // TODO: generate better unique clip ID
                let clipID
                if(storedClip.title.length == 0) clipID = storedClip.timestamp + ".mp4"
                else {
                    const filenameString = storedClip.title.split(' ').join('_')
                    clipID = storedClip.timestamp + '_' + filenameString + '.mp4'
                }
                const command = "ffmpeg -ss " + storedClip.start + " -i *" + storedClip.videoId + ".mp4 -t " + storedClip.duration + " -c copy " + clipID
                exec(command, {
                    cwd: videoDirectory,
                }, (error, stdout, stderr) => {
                    if (error) {
                        console.error('ERROR clip\n', error)
                        if(error.toString().includes('Syntax error: Unterminated quoted string')) throw('Syntax error: Unterminated quoted string')
                        return
                    }
                    console.log('clip made @ ', videoDirectory + "/" + clipID)
                    const serverUri = path.join(videoDirectory,clipID)
                    const updatedClipObject = {
                        ...storedClip,
                        serverUri
                    }
                    r.table('clips').update(updatedClipObject).run(connection)
                    resolve(updatedClipObject)
                })
            }).error(error => {
                console.log(`\nget clip object error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

module.exports = clip
