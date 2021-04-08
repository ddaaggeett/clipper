const fs = require('fs')
const Jimp = require('jimp')
const path = require('path')
const { exec } = require('child_process')
const { videoDataDirectory } = require('../../config')

const thumbWidth = 1280
const thumbHeight = 720

const getThumbnail = (clipObject) => {
    return new Promise((resolve, reject) => {
        const videoDirectory = path.join(videoDataDirectory, clipObject.videoId)
        const thumbnailFile = clipObject.id + '_thumbnail.png'
        const thumbnailUri = path.join(videoDirectory, thumbnailFile)
        fs.watchFile(thumbnailUri, (current, prev) => {
            if (current.isFile()) {
                fs.unwatchFile(thumbnailUri)
                console.log('thumbnail clipped from video. now adding text to image.')
                addThumbnailText(thumbnailUri, clipObject.title)
                resolve({
                    ...clipObject,
                    thumbnailUri
                })
            } else {
                console.log('no thumbnail file yet')
            }
        })

        const command = `ffmpeg -i ${path.basename(videoDirectory)}.mp4 -vframes 1 -an -s ${thumbWidth}x${thumbHeight} -ss ${clipObject.thumbnailTime} ${thumbnailFile}`

        exec(command, {
            cwd: videoDirectory,
        }, (error, stdout, stderr) => {
            if(error) console.log(error)
        })
    })
}

const addThumbnailText = async (thumbnailUri, text) => {
    console.log('WRITING TEXT TO THUMBNAIL')
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    const image = await Jimp.read(thumbnailUri);
    image.print(
        font,
        0,
        0,
        {
            text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        thumbWidth,
        thumbHeight
    );
    image.write(thumbnailUri)
}

module.exports = {
    getThumbnail,
}
