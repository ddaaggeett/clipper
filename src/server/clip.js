const { exec } = require('child_process')
const fs = require('fs')
var { dbConnxConfig } = require('../../config')
var r = require('rethinkdb')
const path = require('path')

const clip = (clipDirectory, clipObject) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clipObject.id).run(connection).then(storedClip => {
                const clipFile = clipObject.id + '.mp4'
                const clipUri = path.join(clipDirectory,clipFile)
                const command = `ffmpeg -ss ${storedClip.start} -i ../${storedClip.videoId}.mp4 -t ${storedClip.duration} -c copy ${clipFile}`
                exec(command, {
                    cwd: clipDirectory,
                }, (error, stdout, stderr) => {
                    if (error) {
                        console.error('ERROR clip\n', error)
                        if(error.toString().includes('Syntax error: Unterminated quoted string')) throw('Syntax error: Unterminated quoted string')
                        return
                    }
                    console.log('clip made @ ', clipUri)
                    const updatedClipObject = {
                        ...storedClip,
                        clipUri
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
