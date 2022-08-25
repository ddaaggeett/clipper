var r = require('rethinkdb')
var { dbConnxConfig, progressionsListLength } = require('../../../config')

const userLog = (user) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').insert(user, {
                returnChanges: true,
                conflict: "update"
            }).run(connection).then(result => {
                r.table('users').get(user.id).run(connection)
                .then(userData => resolve(userData))
                .catch(error => {
                    console.log(`\nERROR getting user data\n${error}`)
                    reject(error)
                })
            })
            .catch(error => {
                console.log(`\nERROR user data retrieval\n${error}`)
                reject(error)
            })
        })
        .catch(error => {
            console.log(`\ndb connection error\n${error}`)
            reject(error)
        })
    })
}

const getClips = (userID) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(userID)('clips').run(connection)
            .then(clipIDlist => {
                var userClips = []
                clipIDlist.forEach(clipID => {
                    r.table('clips').get(clipID).run(connection)
                    .then(clip => {
                        userClips.push(clip)
                        if (userClips.length == clipIDlist.length) {
                            console.log('\nuserClips')
                            console.log(userClips)
                            resolve(userClips)
                        }
                    })
                    .catch(error => {
                        console.log(`\nERROR getting user clips\n${error}`)
                        reject(error)
                    })
                })
            })
            .catch(error => resolve([]))
        })
        .catch(error => {
            console.log(`\ndb connection error\n${error}`)
            reject(error)
        })
    })
}

const addClip = (clip) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(clip.userID)('clips').append(clip.id).run(connection).then(clips => {
                r.table('users').get(clip.userID).update({clips}, { returnChanges: true }).run(connection)
                .then(result => resolve())
            })
            .error(error => {
                r.table('users').get(clip.userID).update({clips: [clip.id]}, { returnChanges: true }).run(connection)
                .then(result => resolve())
            })
        })
    })
}

const deleteClip = (clip) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(clip.userID)('clips').run(connection).then(result => {
                const index = result.findIndex(id => id === clip.id)
                r.table('users').get(clip.userID).update({ clips: r.row('clips').deleteAt(index) }).run(connection)
                .then(() => resolve())
            })
        })
    })
}

const updateVideoProgress = (progressionObject) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(progressionObject.userID)('progressions').run(connection).then(progressions => {

                var index = progressions.findIndex(item => item.videoID === progressionObject.videoID)

                if (progressionObject.progress == null) {
                    // TODO: null not working
                    progressions = [
                        ...progressions.slice(0,index),
                        ...progressions.slice(index + 1, progressions.length)
                    ]
                }
                else if (index == -1) {
                    if (progressions.length < progressionsListLength) progressions = [
                        progressionObject,
                        ...progressions
                    ]
                    else progressions = [
                        progressionObject,
                        ...progressions.slice(0, progressionsListLength - 1)
                    ]
                }
                else {
                    progressions = [
                        ...progressions.slice(0,index),
                        {
                            ...progressions[index],
                            ...progressionObject,
                        },
                        ...progressions.slice(index + 1, progressions.length)
                    ]
                }

                r.table('users').get(progressionObject.userID).update({progressions}, { returnChanges: true }).run(connection).then(result => {
                    const updatedProgressions = result.changes[0].new_val.progressions
                    resolve(updatedProgressions)
                })
            })
            .error(error => {
                r.table('users').get(progressionObject.userID).update({progressions: [progressionObject]}, { returnChanges: true }).run(connection).then(result => {
                    const updatedProgressions = result.changes[0].new_val.progressions
                    resolve(updatedProgressions)
                })
            })
        })
    })
}

module.exports = {
    userLog,
    getClips,
    addClip,
    deleteClip,
    updateVideoProgress,
}
