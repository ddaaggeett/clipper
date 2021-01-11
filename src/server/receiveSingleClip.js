var { storeData } = require('./storage')

const addClip = (clip, serverData) => {
    return new Promise((resolve,reject) => {
        var newData = {
            ...serverData,
            clips: [...serverData.clips, clip],
        }
        storeData(newData).then(() => resolve(newData))
    })
}

const editClip = (clip, serverData) => {
    return new Promise((resolve,reject) => {
        var newData
        for(var x = 0; x < serverData.clips.length; x++) {
            if(clip.id === serverData.clips[x].id) {
                newData = {
                    ...serverData,
                    clips: serverData.clips.slice(0,x).concat(clip).concat(serverData.clips.slice(x+1,serverData.clips.length))
                }
            }
        }
        storeData(newData).then(() => resolve(newData))
    })
}

const deleteClip = (clip, serverData) => {
    return new Promise((resolve,reject) => {
        var newData
        for(var x = 0; x < serverData.clips.length; x++) {
            if(clip.id === serverData.clips[x].id) {
                newData = {
                    ...serverData,
                    clips: serverData.clips.slice(0,x).concat(serverData.clips.slice(x+1,serverData.clips.length))
                }
            }
        }
        storeData(newData).then(() => resolve(newData))
    })
}

module.exports = {
    addClip,
    editClip,
    deleteClip,
}
