const r = require('rethinkdb')
const { dbConnxConfig } = require('../../../config')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const { serverIP, socketPort } = require('../../../config')
const { getRooms } = require('./rooms')

let rooms = []

io.on('connection', (socket) => {

    socket.on('join_room', (packet, callback) => {
        // socket.join(room.id) // TODO:
        packet = {
            ...packet,
            rooms,
        }
        getRooms(packet)
        .then(({updatedRooms, room}) => {
            rooms = updatedRooms
            io.emit('broadcast_rooms_available', rooms, () => {
                callback(room)
            })
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
