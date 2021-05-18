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
            r.table('clips').filter({user_id}).run(connection).then(result => {
                if (result._responses.length != 0) resolve(result._responses[0].r)
            }).error(error => {
                console.log(`\nuser clips retrieval error\n${error}`)
            })
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
    })
}

module.exports = {
    userLog,
    getUserClips,
    addClip,
}
