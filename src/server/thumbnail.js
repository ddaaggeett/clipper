const fs = require('fs')
const Jimp = require('jimp')
const path = require('path')
const { exec } = require('child_process')
const { videoDataDirectory, dbConnxConfig } = require('../../config')
const r = require('rethinkdb')

const thumbWidth = 1280
const thumbHeight = 720

const getThumbnail = (clipObject) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            const videoDirectory = path.join(videoDataDirectory, clipObject.videoId)
            const clipDirectory = path.join(videoDirectory, clipObject.id)
            const thumbnailFile_white = 'thumbnail_white.png'
            const thumbnail_white_uri = path.join(clipDirectory, thumbnailFile_white)
            const thumbnailFile_black = 'thumbnail_black.png'
            const thumbnail_black_uri = path.join(clipDirectory, thumbnailFile_black)

            fs.watchFile(thumbnail_white_uri, (current, prev) => {
                if (current.isFile() && prev.isFile()) {
                    fs.unwatchFile(thumbnail_white_uri)
                    const updatedClipObject = {
                        ...clipObject,
                        thumbnail_white_uri
                    }
                    r.table('clips').update(updatedClipObject).run(connection)
                    resolve(updatedClipObject)
                }
                else if (current.isFile() && !prev.isFile()) {
                    addThumbnailText(thumbnail_white_uri, clipObject.title, 'white')
                }
                else {
                    console.log('no thumbnail file yet')
                }
            })

            fs.watchFile(thumbnail_black_uri, (current, prev) => {
                if (current.isFile() && prev.isFile()) {
                    fs.unwatchFile(thumbnail_black_uri)
                    const updatedClipObject = {
                        ...clipObject,
                        thumbnail_black_uri
                    }
                    r.table('clips').update(updatedClipObject).run(connection)
                    resolve(updatedClipObject)
                }
                else if (current.isFile() && !prev.isFile()) {
                    addThumbnailText(thumbnail_black_uri, clipObject.title, 'black')
                }
                else {
                    console.log('no thumbnail file yet')
                }
            })

            const command_white = `ffmpeg -ss ${clipObject.thumbnailTime} -i ../${path.basename(videoDirectory)}.mp4 -vframes 1 -s ${thumbWidth}x${thumbHeight} ${thumbnailFile_white}`
            const command_black = `ffmpeg -ss ${clipObject.thumbnailTime} -i ../${path.basename(videoDirectory)}.mp4 -vframes 1 -s ${thumbWidth}x${thumbHeight} ${thumbnailFile_black}`

            exec(command_white, {
                cwd: clipDirectory,
            }, (error, stdout, stderr) => {
                if(error) console.log(error)
            })
            exec(command_black, {
                cwd: clipDirectory,
            }, (error, stdout, stderr) => {
                if(error) console.log(error)
            })
        })
    })
}

const addThumbnailText = async (thumbnailUri, text, color) => {
    console.log('WRITING TEXT TO THUMBNAIL')
    var font
    color === 'white' ? font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE) : font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
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
