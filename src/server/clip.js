const {
    exec,
} = require('child_process')
const fs = require('fs')

const clip = (clipObject) => {
    // TODO: generate better unique clip ID
    const clipID = "_clip_" + clipObject.videoId + "_" + Date.now().toString() + ".mp4"
    const command = "ffmpeg -ss " + clipObject.start + " -i *" + clipObject.videoId + ".mp4 -t " + clipObject.duration + " -c copy " + clipID
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('ERROR clip\n', error)
            return
        }
        console.log('clip made\t', clipID)
    })
}

module.exports = clip
