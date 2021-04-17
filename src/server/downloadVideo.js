const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const downloadVideo = (videoDirectory, videoId) => {
    return new Promise((resolve,reject) => {
        const command = `youtube-dl -f best https://www.youtube.com/watch?v=${videoId} --id --write-thumbnail`
        exec(command, {
            cwd: videoDirectory,
        }, (error, stdout, stderr) => {
            console.log(`\nERROR: downloadVideo() ${videoId}:\n${error}`)
            if (error) {
                if (error.toString().includes('[Errno -3] Temporary failure in name resolution')) {
                    /*
                    recursion should be fine here since this is not a youtube-dl issue.
                    instead is a networking issue so error should not persist and
                    recursion should not be endless
                    */
                    downloadVideo(videoDirectory, videoId)
                }
                else console.log(`TODO: downloadVideo() ${videoId} error not yet caught\n`)
            }
            console.log(stdout)
            var lines = stdout.toString().split('\n')
            lines.forEach(line => {
                if(line.includes('[download] 100%')) {
                    console.log(`\nDOWNLOAD COMPLETE: ${videoId}`)
                    formatThumbnail(videoDirectory, videoId)
                    resolve()
                }
            })
        })
    })
}

const formatThumbnail = (videoDirectory, videoId) => {
    fs.readdir(videoDirectory, (err, contents) => {
        contents.forEach(item => {
            if (item.match(/.(jpg|jpeg|png|webp)$/i)) {
                const originalThumbURI = path.join(videoDirectory, item)
                const newThumbnailURI = path.join(videoDirectory, videoId + '.png')
                fs.rename(originalThumbURI, newThumbnailURI, (error) => {
                    if (error) console.log(error)
                })
            }
        })
    })
}

module.exports = downloadVideo
