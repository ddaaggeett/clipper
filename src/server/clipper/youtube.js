const { exec, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const r = require('rethinkdb')
const { dbConnxConfig } = require('../../../config')
const functions = require('../functions')

const clipper = functions.getAppObject('clipper')

const downloadVideo = (videoDirectory, videoID) => {
    return new Promise((resolve,reject) => {
        const video = `${videoID}.mp4`
        const command = spawn(`yt-dlp`, [
            `https://www.youtube.com/watch?v=${videoID}`,
            `-f`, `"\"bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b\""`,
            `-o`, `${video}`,
            `--write-thumbnail`
        ], {
            cwd: videoDirectory,
        })
        const file = path.join(videoDirectory,video)
        fs.watchFile(file, (current, prev) => {
            if (current.isFile()) {
                fs.unwatchFile(file)
                console.log(`\n\nDOWNLOAD COMPLETE: ${videoID}`)
                formatThumbnail(videoDirectory, videoID) // TODO: could need fixing
                resolve(true)
            }
        })
        command.stdout.on('data', data => {
            const line = data.toString()
            process.stdout.write(line)
            if (line.includes(`already been downloaded`)) {
                resolve(false)
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
        const videoDirectory = path.join(clipper.fileData, videoObject.videoID)
        // TODO: change youtube-dl -> yt-dlp
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
