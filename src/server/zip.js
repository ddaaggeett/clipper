/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
const AdmZip = require('adm-zip')

const zipClip = (clipObject) => {
    var zip = new AdmZip()
    if (clipObject.clipUri !== undefined) zip.addLocalFile(clipObject.clipUri)
    if ( clipObject.thumbnails != undefined ) {
        zip.addLocalFile(clipObject.thumbnails[0])
        zip.addLocalFile(clipObject.thumbnails[1])
    }
    const info = `${clipObject.title} /// ${clipObject.who}\nclipped from: https://www.youtube.com/watch?v=${clipObject.videoID}`
    const buffer = Buffer.from(info, 'utf8')
    zip.addFile('info.txt', buffer)
    zip.writeZip(clipObject.zipUri)
    console.log('zip created')
}

module.exports = {
    zipClip,
}
