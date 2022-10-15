var { dbConnxConfig } = require('../../../config')
var r = require('rethinkdb')

const saveRoom = (room) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig)
        .then(connection => {
            r.table('rooms')
            .insert(room, { returnChanges: true, conflict: 'update' })
            .run(connection)
            .then(result => {
                const storedRoom = result.changes[0].new_val
                resolve(storedRoom)
            })
            .error(error => {
                console.log(`\nrooms table error\n${error}`)
            })
        })
        .error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const deleteRoom = (room) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig)
        .then(connection => {
            r.table('rooms')
            .get(room.id)
            .delete()
            .run(connection)
            .then(result => {
                resolve()
            })
            .error(error => {
                console.log(`\nrooms table error\n${error}`)
            })
        })
        .error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

module.exports = {
    saveRoom,
    deleteRoom,
}
