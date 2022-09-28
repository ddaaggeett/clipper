const r = require('rethinkdb')
const { dbConnxConfig } = require('../../../config')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const { serverIP, socketPort } = require('../../../config')
const { getRooms, addRoomMessage } = require('./rooms')

let rooms = []

io.on('connection', (socket) => {

    socket.on('message', message => {
        const { updatedRoom, updatedRooms } = addRoomMessage(message, rooms)
        rooms = updatedRooms
        io.to(message.roomID).emit('update_room', updatedRoom)
        io.emit('broadcast_rooms_available', rooms) // TODO: socket.broadcast.emit instead?
    })

    socket.on('join_room', (packet) => {
        socket.join(packet.room.id)
        packet = {
            ...packet,
            rooms,
        }
        getRooms(packet)
        .then(({updatedRooms, updatedRoom, prevRoomID}) => {
            if (prevRoomID) socket.leave(prevRoomID)
            rooms = updatedRooms
            io.to(packet.room.id).emit('update_room', updatedRoom)
            io.emit('broadcast_rooms_available', rooms) // TODO: socket.broadcast.emit instead?
        })
    })

    socket.on('get_rooms_available', (callback) => {
        callback(rooms)
    })

    socket.on('disconnect', () => {
    })

})

http.listen(socketPort.podware, function(){
    console.log('socket.io listening on *:' + socketPort.podware)
})
