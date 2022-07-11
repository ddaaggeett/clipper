const { exec, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const r = require('rethinkdb')
const { dbConnxConfig, fileData } = require('../../../config')

const downloadVideo = (videoDirectory, videoID) => {
    return new Promise((resolve,reject) => {
        const command = spawn(`youtube-dl`, [`-f`, `best`, `https://www.youtube.com/watch?v=${videoID}`, `--id`, `--write-thumbnail`], {
            cwd: videoDirectory,
        })
        command.stdout.on('data', data => {
            const line = data.toString()
            console.log(line)
            if(line.includes('[download] 100%')) {
                console.log(`\nDOWNLOAD COMPLETE: ${videoID}`)
                formatThumbnail(videoDirectory, videoID)
                resolve()
            }
        })
        command.stderr.on('data', error => {
            console.log(`\nERROR: downloadVideo() ${videoID}:\n${error}`)
            if (error.toString().includes('[Errno -3] Temporary failure in name resolution')) {
                /*
                recursion should be fine here since this is not a youtube-dl issue.
                instead is a networking issue so error should not persist and
                recursion should not be endless
                */
                downloadVideo(videoDirectory, videoID)
            }
            else console.log(`TODO: downloadVideo() ${videoID} error not yet caught\n`)
        })
    })
}

const formatThumbnail = (videoDirectory, videoID) => {
    fs.readdir(videoDirectory, (err, contents) => {
        contents.forEach(item => {
            if (item.match(/.(jpg|jpeg|png|webp)$/i)) {
                const originalThumbURI = path.join(videoDirectory, item)
                const newThumbnailURI = path.join(videoDirectory, videoID + '.png')
                fs.rename(originalThumbURI, newThumbnailURI, (error) => {
                    if (error) console.log(error)
                })
            }
        })
    })
}

const updateSourceVideo = (videoObject) => {

    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(fileData.clipper, videoObject.videoID)
        const command = `youtube-dl -f best https://www.youtube.com/watch?v=${videoObject.videoID} --get-title`
        exec(command, {
            cwd: videoDirectory,
        }, (error, stdout, stderr) => {
            if (!error) {
                videoObject = {
                    ...videoObject,
                    title: stdout,
                }
                r.connect(dbConnxConfig).then(connection => {
                    r.table('sourceVideos').insert(videoObject, { returnChanges: true, conflict: 'update' }).run(connection).then(result => {
                        resolve(videoObject)
                    })
                })
            }
        })
    })
}

module.exports = {
    downloadVideo,
    updateSourceVideo,
}
