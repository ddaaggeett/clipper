var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')
var editVideoFileName = require('./editVideoFileName')
var generateClip = require('./generateClip')

const updateClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').insert(clip, { returnChanges: true, conflict: 'update' }).run(connection).then(result => {
                const updatedClip = result.changes[0].new_val
                const oldClip = result.changes[0].old_val
                if (oldClip == null) {
                    generateClip(updatedClip).then(updatedClipObject => resolve(updatedClipObject))
                }
                else if (oldClip != null && updatedClip.title !== oldClip.title) {
                    try {
                        editVideoFileName(updatedClip).then(clipWithNewFileName => resolve(clipWithNewFileName))
                    }
                    catch(error) {
                        switch (error) {
                            case 'ENOENT: no such file or directory':
                                generateClip(updatedClip).then(updatedClipObject => resolve(updatedClipObject))
                        }
                    }
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
