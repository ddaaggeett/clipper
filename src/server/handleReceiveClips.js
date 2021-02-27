var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')
var editVideoFileName = require('./editVideoFileName')
var generateClip = require('./generateClip')

const addClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').insert(clip, { returnChanges: true, conflict: 'update' }).run(connection).then(result => {
                console.log(`\naddClip result\n${JSON.stringify(result,null,4)}`)
                const newClip = result.changes[0].new_val
                if (result.changes[0].old_val == null) generateClip(newClip)
                resolve(newClip)
            }).error(error => {
                console.log(`\naddClip error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const updateClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clip.id).replace(clip, { returnChanges: true }).run(connection).then(result => {
                if(result.changes[0].new_val.title !== result.changes[0].old_val.title) editVideoFileName(result.changes[0].new_val)
                console.log(`\neditClip result\n${JSON.stringify(result,null,4)}`)
                const updatedClip = result.changes[0].new_val
                resolve(updatedClip)
            }).error(error => {
                console.log(`\neditClip error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const deleteClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clip.id).delete({ returnChanges: true }).run(connection).then(result => {
                console.log(`\ndeleteClip result\n${JSON.stringify(result,null,4)}`)
                const deletedClip = result.changes[0].old_val
                resolve(deletedClip)
            }).error(error => {
                console.log(`\ndeleteClip error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const handlePendingClips = (pendingClips) => {
    return new Promise((resolve,reject) => {
        if (pendingClips.length != 0) pendingClips.forEach(clip => {
            if (clip.deleted && clip.id != undefined) deleteClip(clip)
            else addClip(clip)
        })
        resolve()
    })
}

module.exports = {
    addClip,
    updateClip,
    deleteClip,
    handlePendingClips,
}
