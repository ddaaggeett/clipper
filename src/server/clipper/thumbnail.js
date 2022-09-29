const fs = require('fs')
const Jimp = require('jimp')
const path = require('path')
const { exec } = require('child_process')
const { dbConnxConfig } = require('../../../config')
const r = require('rethinkdb')
const functions = require('../functions')

const clipper = functions.getAppObject('clipper')

const thumbWidth = 1280
const thumbHeight = 720

const generateThumbnails = (clipObject) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            const videoDirectory = path.join(clipper.fileData, clipObject.videoID)
            const clipDirectory = path.join(videoDirectory, clipObject.id)
            const singleFrameURI = path.join(clipDirectory, 'singleFrame.png')
            const thumbnail_white_uri = path.join(clipDirectory, 'thumbnail_white.png')
            const thumbnail_black_uri = path.join(clipDirectory, 'thumbnail_black.png')

            clipObject = {
                ...clipObject,
                videoDirectory,
                clipDirectory,
                singleFrameURI,
                thumbnails: [thumbnail_white_uri, thumbnail_black_uri]
            }

            if (!fs.existsSync(clipObject.singleFrameURI)) getFrame(clipObject)
            else {
                fs.rm(clipObject.singleFrameURI, () => {
                    fs.rm(clipObject.thumbnails[0], () => {
                        fs.rm(clipObject.thumbnails[1], () => {
                            getFrame(clipObject)
                        })
                    })
                })
            }

            r.table('clips').update(clipObject).run(connection)
            resolve(clipObject)
        })
    })
}

const getFrame = (clipObject) => {
    var time = 0
    if (clipObject.thumbnailTime != undefined) time = clipObject.thumbnailTime
    const command = `ffmpeg -ss ${time} -i ../${path.basename(clipObject.videoDirectory)}.mp4 -vframes 1 -s ${thumbWidth}x${thumbHeight} ${path.basename(clipObject.singleFrameURI)}`

    exec(command, {
        cwd: clipObject.clipDirectory,
        // TODO: error - need maxBuffer
    }, (error, stdout, stderr) => {
        if(error) console.log(error)
        clipObject.thumbnails.forEach(thumbnailURI => thumbnailWatch(thumbnailURI, clipObject))
    })
}

const thumbnailWatch = (thumbnailURI, clipObject) => {
    fs.watchFile(thumbnailURI, (current, prev) => {
        if (thumbnailURI.includes('white')) addThumbnailText(thumbnailURI, clipObject, 'white').then(() => fs.unwatchFile(thumbnailURI))
        else addThumbnailText(thumbnailURI, clipObject, 'black').then(() => fs.unwatchFile(thumbnailURI))
    })
}

const addThumbnailText = async (thumbnailURI, clipObject, color) => {
    const text = clipObject.thumbnailText
    console.log(`WRITING "${text}" in ${color} to\n${thumbnailURI}`)
    var font
    color === 'white' ? font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE) : font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
    const image = await Jimp.read(clipObject.singleFrameURI);
    image.print(
        font,
        0,
        0,
        {
            text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: 10
        },
        thumbWidth,
        thumbHeight
    );
    image.write(thumbnailURI)
    return
}

module.exports = {
    generateThumbnails,
}
