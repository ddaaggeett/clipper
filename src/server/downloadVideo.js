const {
    exec,
} = require('child_process')

const downloadVideo = (videoDirectory, videoId) => {
    return new Promise((resolve,reject) => {
        const command = "youtube-dl -f best https://www.youtube.com/watch?v=" + videoId + ' --id'
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
                    resolve()
                }
            })
        })
    })
}

module.exports = downloadVideo
