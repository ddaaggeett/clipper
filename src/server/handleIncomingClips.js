var fs = require('fs')
var { dataFile } = require('../../config')
var generateClip = require('./generateClip')
var { storeData } = require('./storage')

const handleIncomingClips = (incomingClips, serverData) => {
    return new Promise((resolve,reject) => {
        var newClips = []
        var ids = []
        for(var x = 0; x < serverData.clips.length; x++) {
            ids.push(serverData.clips[x].id)
        }
        for(var x = 0; x < incomingClips.length; x++) {
            // if object doesn't exist yet
            if(!ids.includes(incomingClips[x].id)) {
                newClips.push(incomingClips[x])
                generateClip(incomingClips[x])
            }
            // if object exists but is not equal to previously stored object
            else {
                if(JSON.stringify(serverData.clips[x]) !== JSON.stringify(incomingClips[x])) {
                    serverData.clips[x] = incomingClips[x]
                }
            }
        }
        const newData = {
            ...serverData,
            clips: serverData.clips.concat(newClips)
        }
        storeData(newData).then(() => resolve(newData))
    })
}

module.exports = handleIncomingClips
