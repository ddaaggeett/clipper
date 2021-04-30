const Zip = require('adm-zip')
const path = require('path')

const bufferClipInfo = (clipObject) => {
    const info = `${clipObject.title} /// ${clipObject.who}\nclipped from: https://www.youtube.com/watch?v=${clipObject.videoId}`
    return Buffer.from(info, 'utf8')
}

const zipClip = (clipObject) => {
    return new Promise((resolve, reject) => {

        clipObject = {
            ...clipObject,
            zipUri: path.join(path.dirname(clipObject.clipUri), 'clip.zip')
        }

        var zip = new Zip()
        if (clipObject.clipUri !== undefined) zip.addLocalFile(clipObject.clipUri)
        if (clipObject.thumbnails[0] !== undefined) zip.addLocalFile(clipObject.thumbnails[0])
        if (clipObject.thumbnails[1] !== undefined) zip.addLocalFile(clipObject.thumbnails[1])
        zip.addFile('info.txt', bufferClipInfo(clipObject))
        zip.writeZip(clipObject.zipUri)
        console.log('ZIPPED')
        resolve(clipObject)
    })
}

const updateZipInfo = (clipObject) => {
    const zip = new Zip(clipObject.zipUri)
    zip.getEntries().forEach(item => {
        if (item.entryName === 'info.txt') zip.updateFile(item, bufferClipInfo(clipObject))
        zip.writeZip(clipObject.zipUri)
    })
}

const updateZipThumbs = (clipObject) => {
    const zip = new Zip(clipObject.zipUri)
    zip.getEntries().forEach(item => {
        if (item.entryName.includes('white')) {
            zip.deleteFile(item)
            zip.addLocalFile(clipObject.thumbnails[0])
        }
        else if (item.entryName.includes('black')) {
            zip.deleteFile(item)
            zip.addLocalFile(clipObject.thumbnails[1])
        }
        zip.writeZip(clipObject.zipUri)
    })
}

module.exports = {
    zipClip,
    updateZipInfo,
    updateZipThumbs,
}
