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
        const clipDirectory = path.join(videoDirectory, clipObject.id)
        const thumbnailFile = clipObject.id + '_thumbnail.png'
        const thumbnailUri = path.join(clipDirectory, thumbnailFile)
        fs.watchFile(thumbnailUri, (current, prev) => {
            if (current.isFile()) {
                fs.unwatchFile(thumbnailUri)
                addThumbnailText(thumbnailUri, clipObject.title)
                resolve({
                    ...clipObject,
                    thumbnailUri
                })
            } else {
                console.log('no thumbnail file yet')
            }
        })

        const command = `ffmpeg -ss ${clipObject.thumbnailTime} -i ../${path.basename(videoDirectory)}.mp4 -vframes 1 -s ${thumbWidth}x${thumbHeight} ${thumbnailFile}`

        exec(command, {
            cwd: clipDirectory,
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
