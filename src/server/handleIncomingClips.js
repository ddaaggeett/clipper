var fs = require('fs')
var { dataFileName } = require('../../config')
const dataFile = __dirname + "/" + dataFileName

const handleIncomingClips = (newClips, data) => {
    // TODO: only concat clips server doesn't have yet
    var updatedClips = data.clips.concat(newClips)
    const newData = {
        ...data,
        clips: updatedClips
    }
    fs.writeFile(dataFile, JSON.stringify(newData), (error) => {
        if(error) console.log('ERROR writing file:', error)
    })
}

module.exports = handleIncomingClips
