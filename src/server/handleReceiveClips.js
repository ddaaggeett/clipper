var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')
var editVideoFileName = require('./editVideoFileName')
var generateClip = require('./generateClip')

const updateClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').insert(clip, { returnChanges: true, conflict: 'update' }).run(connection).then(result => {
                console.log(`\naddClip result\n${JSON.stringify(result,null,4)}`)
                const updatedClip = result.changes[0].new_val
                const oldClip = result.changes[0].old_val
                if (oldClip == null) generateClip(updatedClip)
                else if (oldClip != null && updatedClip.title !== oldClip.title) editVideoFileName(updatedClip)
                resolve(updatedClip)
            }).error(error => {
                console.log(`\nupdateClip error\n${error}`)
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
            if (clip.deleted) deleteClip(clip)
            else updateClip(clip)
        })
        resolve()
    })
}

module.exports = {
    updateClip,
    deleteClip,
    handlePendingClips,
}
