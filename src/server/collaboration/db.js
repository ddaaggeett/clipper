var { dbConnxConfig } = require('../../../config')
var r = require('rethinkdb')

const getRooms = () => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig)
        .then(connection => {
            r.table('rooms')
            .run(connection)
            .then(result => {
                if (result._responses.length > 0) {
                    const rooms = result._responses[0].r
                    resolve(rooms)
                }
                else resolve([])
            })
            .error(error => {
                console.log(`\nget rooms error\n${error}`)
            })
        })
        .error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

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

const listUsers = (string) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users')
            .filter(user => {
                return user("name").match(`^${string}`);
            }).run(connection)
            .then(response => {
                if (response._responses.length > 0) {
                    const list = response._responses[0].r
                    resolve(list)
                }
            }).error(error => {
                console.log(`\nfind users error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const saveMessage = (message) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('rooms')
            .get(message.roomID)('messages')
            .append(message)
            .run(connection)
            .then(messages => {
                r.table('rooms')
                .get(message.roomID)
                .update({messages}, { returnChanges: true })
                .run(connection)
                .then(result => {
                    const updatedRoom = result.changes[0].new_val
                    resolve(updatedRoom)
                })
            })
            .error(error => {
                console.log(`\nappend message error\n${error}`)
            })
        })
        .error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

module.exports = {
    getRooms,
    saveRoom,
    deleteRoom,
    listUsers,
    saveMessage,
}
