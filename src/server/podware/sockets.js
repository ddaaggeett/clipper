const r = require('rethinkdb')
const { dbConnxConfig } = require('../../../config')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const { serverIP, socketPort } = require('../../../config')

let rooms = []

io.on('connection', (socket) => {

    socket.on('new_available_room', (packet, callback) => {
        const room = {
            id: packet.room,
            users: [packet.user],
        }
        rooms.push(room)
        io.emit('broadcast_rooms_available', rooms, () => {
            callback(room)
        })
    })

    socket.on('disconnect', () => {
    })

})

http.listen(socketPort.podware, function(){
    console.log('socket.io listening on *:' + socketPort.podware)
})
