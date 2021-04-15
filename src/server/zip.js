const AdmZip = require('adm-zip')

const zipClip = (clipObject) => {
    var zip = new AdmZip()
    if (clipObject.clipUri !== undefined) zip.addLocalFile(clipObject.clipUri)
    if (clipObject.thumbnails[0] !== undefined) zip.addLocalFile(clipObject.thumbnails[0])
    if (clipObject.thumbnails[1] !== undefined) zip.addLocalFile(clipObject.thumbnails[1])
    const info = `${clipObject.title} /// ${clipObject.who}\nclipped from: https://www.youtube.com/watch?v=${clipObject.videoId}`
    const buffer = Buffer.from(info, 'utf8')
    zip.addFile('info.txt', buffer)
    zip.writeZip(clipObject.zipUri)
    console.log('zip created')
}

module.exports = {
    zipClip,
}
