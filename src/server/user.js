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

module.exports = {
    userLog,
}
