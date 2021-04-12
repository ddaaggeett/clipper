const AdmZip = require('adm-zip')

const zipClip = (clipObject) => {
    var zip = new AdmZip()
    if (clipObject.clipUri !== undefined) zip.addLocalFile(clipObject.clipUri)
    if (clipObject.thumbnail_white_uri !== undefined) zip.addLocalFile(clipObject.thumbnail_white_uri)
    if (clipObject.thumbnail_black_uri !== undefined) zip.addLocalFile(clipObject.thumbnail_black_uri)
    zip.writeZip(clipObject.zipUri)
    console.log('zip created')
}

module.exports = {
    zipClip,
}
