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

        // socket.join(room.id) // TODO:

        const room = {
            id: packet.room,
            users: [packet.user],
        }

        rooms.push(room)

        io.emit('broadcast_rooms_available', rooms, () => {
            callback(room)
        })
    })

    socket.on('join_room', (packet, callback) => {

        // socket.join(room.id) // TODO:

        const user = packet.user
        const id = packet.room.id
        let users = packet.room.users

        var userAlreadyInRoom = false
        for(var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                userAlreadyInRoom = true
                break
            }
        }
        if (!userAlreadyInRoom) users.push(user)

        const room = {
            id,
            users,
        }

        const index = rooms.findIndex(item => item.id === room.id)

        rooms = [
            ...rooms.slice(0, index),
            room,
            ...rooms.slice(index + 1, rooms.length),
        ]

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
