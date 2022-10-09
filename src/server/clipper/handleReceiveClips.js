var r = require('rethinkdb')
var { dbConnxConfig } = require('../../../config')
var generateClip = require('./generateClip')
const { generateThumbnails } = require('./thumbnail')
const user = require('./user')

const updateClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').insert(clip, { returnChanges: true, conflict: 'update' }).run(connection).then(result => {
                const updatedClip = result.changes[0].new_val
                if (result.changes.length != 0 && updatedClip != undefined) {
                    const oldClip = result.changes[0].old_val
                    if (oldClip == null) {
                        generateClip(updatedClip)
                        .then(object => {
                            user.addClip(object)
                            .then(() => {
                                resolve(object)
                            })
                        })
                    }
                    else if(updatedClip.thumbnailTime != oldClip.thumbnailTime || updatedClip.thumbnailText != oldClip.thumbnailText) {
                        generateThumbnails(updatedClip).then(updatedClipObject => resolve(updatedClipObject))
                    }
                    else resolve(updatedClip)
                }
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
                if (result.changes[0].old_val != undefined) {
                    const deletedClip = result.changes[0].old_val
                    user.deleteClip(clip).then(() => resolve(deletedClip))
                }
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
        let count = 0
        if (pendingClips.length != 0) pendingClips.forEach(clip => {
            count++
            if (clip.deleted) deleteClip(clip).then(() => {
                if(count == pendingClips.lenth) resolve()
            })
            else updateClip(clip).then(() => {
                if(count == pendingClips.lenth) resolve()
            })
        })
        else resolve()
    })
}

module.exports = {
    updateClip,
    deleteClip,
    handlePendingClips,
}
