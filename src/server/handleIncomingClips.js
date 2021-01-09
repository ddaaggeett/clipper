var handleClip = require('./handleClip')
var fs = require('fs')
var { dataFile } = require('../../config')

const handleIncomingClips = (incomingClips, data) => {
    return new Promise((resolve,reject) => {
        var newClips = []
        var ids = []
        for(var x = 0; x < data.clips.length; x++) {
            ids.push(data.clips[x].id)
        }
        for(var x = 0; x < incomingClips.length; x++) {
            // if object doesn't exist yet
            if(!ids.includes(incomingClips[x].id)) {
                newClips.push(incomingClips[x])
                handleClip(incomingClips[x])
            }
            // if object exists but is not equal to previously stored object
            else {
                if(JSON.stringify(data.clips[x]) !== JSON.stringify(incomingClips[x])) {
                    data.clips[x] = incomingClips[x]
                }
            }
        }
        const newData = {
            ...data,
            clips: data.clips.concat(newClips)
        }
        fs.writeFile(dataFile, JSON.stringify(newData, null, 4), (error) => {
            if(error) console.log('ERROR writing file:', error)
            else resolve(newData)
        })
    })
}

module.exports = handleIncomingClips
