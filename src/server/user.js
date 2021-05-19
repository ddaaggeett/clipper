var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')

const userLog = (user) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').insert(user, {
                returnChanges: true,
                conflict: "update"
            }).run(connection).then(result => {
                r.table('users').get(user.id).run(connection).then(userData => resolve(userData))
            }).error(error => {
                console.log(`\nuser data retrieval error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const getUserClips = (user_id) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(user_id)('clips').run(connection).then(clipIDlist => {
                var userClips = []
                clipIDlist.forEach(clipID => {
                    r.table('clips').get(clipID).run(connection).then(clip => {
                        userClips.push(clip)
                        if (userClips.length == clipIDlist.length) {
                            console.log('\nuserClips')
                            console.log(userClips)
                            resolve(userClips)
                        }
                    })
                })
            }).error(error => resolve([]))
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const addClip = (clip) => {
    r.connect(dbConnxConfig).then(connection => {
        r.table('users').get(clip.user_id)('clips').append(clip.id).run(connection).then(clips => {
            r.table('users').get(clip.user_id).update({clips}, { returnChanges: true }).run(connection).then(result => {
                const updatedUser = result.changes[0].new_val
            })
        })
        .error(error => {
            r.table('users').get(clip.user_id).update({clips: [clip.id]}, { returnChanges: true }).run(connection).then(result => {
                const updatedUser = result.changes[0].new_val
            })
        })
    })
}

module.exports = {
    userLog,
    getUserClips,
    addClip,
}
