var fs = require('fs')
var { dataFileName } = require('../../config')
const dataFile = __dirname + "/" + dataFileName

const handleIncomingClips = (incomingClips, data) => {
    var newClips = []
    var ids = []
    for(var x = 0; x < data.clips.length; x++) {
        ids.push(data.clips[x].id)
    }
    for(var x = 0; x < incomingClips.length; x++) {
        if(!ids.includes(incomingClips[x].id)) newClips.push(incomingClips[x])
    }
    const newData = {
        ...data,
        clips: data.clips.concat(newClips)
    }
    fs.writeFile(dataFile, JSON.stringify(newData), (error) => {
        if(error) console.log('ERROR writing file:', error)
    })
}

module.exports = handleIncomingClips
