var { storeData } = require('./storage')
var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')

const addClip = (clip, serverData) => {

    r.connect(dbConnxConfig).then(dbConnx => {
        r.table('clips').insert(clip).run(dbConnx).then(result => {
            console.log(`\naddClip result\n${JSON.stringify(result,null,4)}`)
        }).error(error => {
            console.log(`\naddClip error\n${error}`)
        })
    }).error(error => {
        console.log(`\ndb connection error\n${error}`)
    })

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
