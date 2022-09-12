const r = require('rethinkdb')
const { dbConnxConfig } = require('../../../config')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const { serverIP, socketPort } = require('../../../config')
const { getUserOldRoomInfo } = require('./rooms')

let rooms = []

io.on('connection', (socket) => {

    socket.on('join_room', (packet, callback) => {

        // socket.join(room.id) // TODO:

        const user = packet.user
        let updatedRoom = {}

        // find old room, then delete user from room.users
        const { userInOldRoom, roomIndex, userIndex } = getUserOldRoomInfo(user, rooms)

        if (userInOldRoom) {

            roomUsers = rooms[roomIndex].users
            roomID = rooms[roomIndex].id

            // delete user from previous room
            const updatedUsers = [
                ...roomUsers.slice(0, userIndex),
                ...roomUsers.slice(userIndex + 1, roomUsers.length),
            ]

            updatedRoom = {
                id: roomID,
                users: updatedUsers,
            }

            rooms = [
                ...rooms.slice(0, roomIndex),
                updatedRoom, // previous room without user
                ...rooms.slice(roomIndex + 1, rooms.length),
            ]
        }
        else { // user in new room or doesn't exist in old room
            rooms.push(packet.room)
        }

        io.emit('broadcast_rooms_available', rooms, () => {
            callback(updatedRoom)
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
