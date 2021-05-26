const { exec } = require('child_process')
const r = require('rethinkdb')
const path = require('path')
const { dbConnxConfig, videoDataDirectory } = require('../../config')

const updateSourceVideo = (videoObject) => {

    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(videoDataDirectory, videoObject.videoID)
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
    updateSourceVideo,
}
