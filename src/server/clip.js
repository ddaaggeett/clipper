const {
    exec,
} = require('child_process')
const fs = require('fs')

const clip = (videoDirectory, clipObject) => {
    // TODO: generate better unique clip ID
    let clipID
    if(clipObject.title.length == 0) clipID = clipObject.timestamp + ".mp4"
    else {
        const filenameString = clipObject.title.split(' ').join('_')
        clipID = clipObject.timestamp + '_' + filenameString + '.mp4'
    }
    const command = "ffmpeg -ss " + clipObject.start + " -i *" + clipObject.videoId + ".mp4 -t " + clipObject.duration + " -c copy " + clipID
    exec(command, {
        cwd: videoDirectory,
    }, (error, stdout, stderr) => {
        if (error) {
            console.error('ERROR clip\n', error)
            return
        }
        console.log('clip made @ ', videoDirectory + "/" + clipID)
    })
}

module.exports = clip
