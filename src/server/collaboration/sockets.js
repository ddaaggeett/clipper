const r = require('rethinkdb')
const { dbConnxConfig } = require('../../../config')
const app = require('../expressServer')
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const { updateRooms, addRoomMessage } = require('./rooms')
const functions = require('../functions')
const { listUsers, getRooms } = require('./db')

const collaboration = functions.getAppObject('collaboration')

io.on('connection', (socket) => {

    socket.on('find_users', (string, callback) => {
        listUsers(string).then(list => callback(list))
    })

    socket.on('message', message => {
        addRoomMessage(message)
        .then(updatedRoom => {
            io.to(message.roomID).emit('update_room', updatedRoom)
            getRooms().then(rooms => {
                io.emit('broadcast_rooms_available', rooms) // TODO: socket.broadcast.emit instead?
            })
        })
    })

    socket.on('join_room', (packet) => {
        socket.join(packet.room.id)
        updateRooms(packet)
        .then(({updatedRoom, prevRoomID}) => {
            if (prevRoomID) socket.leave(prevRoomID)
            io.to(packet.room.id).emit('update_room', updatedRoom)
            getRooms().then(rooms => {
                io.emit('broadcast_rooms_available', rooms) // TODO: socket.broadcast.emit instead?
            })
        })
    })

    socket.on('get_rooms_available', (callback) => {
        getRooms().then(rooms => callback(rooms))
    })

    socket.on('disconnect', () => {
    })

})

http.listen(collaboration.socketPort, function(){
    console.log('socket.io listening on *:' + collaboration.socketPort)
})
