const {
    exec,
} = require('child_process')

const downloadVideo = (videoDirectory, videoId) => {
    return new Promise((resolve,reject) => {
        const command = "youtube-dl -f best https://www.youtube.com/watch?v=" + videoId
        exec(command, {
            cwd: videoDirectory,
        }, (error, stdout, stderr) => {
            if (error) {
                console.error('ERROR downloadVideo\n', error)
                return
            }
            console.log(stdout)
            var lines = stdout.toString().split('\n')
            lines.forEach(line => {
                if(line.includes('[download] 100%')) resolve()
            })
        })
    })
}

module.exports = downloadVideo
