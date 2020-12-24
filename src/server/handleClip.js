const {
    exec,
} = require('child_process')
const downloadVideo = require('./downloadVideo')

const handleClip = (clipObject) => {
    // TODO: require('fs') to handle each video in their own directories
    downloadVideo(clipObject.videoId).then(() => {
        console.log('back to handleClip()') // TODO: ffmped make clip
    })
}

module.exports = handleClip
