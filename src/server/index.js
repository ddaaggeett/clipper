var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { port } = require('../../config')
var { updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
var fs = require('fs')
var { getPlaylist, getAllPlaylists } = require('./youtube')
var { userLog, getUserClips } = require('./user')
require('./db')
require('./expressServer')

io.on('connection', (socket) => {
    socket.on('updateClip', (clip, returnToSender) => {
        updateClip(clip).then(updatedClip => {
            returnToSender(updatedClip)
            socket.broadcast.emit('updateClip',updatedClip)
        })
    })
    socket.on('deleteClip', (clip, returnToSender) => {
        deleteClip(clip).then(deletedClip => {
            returnToSender(deletedClip)
            socket.broadcast.emit('deleteClip',deletedClip)
        })
    })
    socket.on('getPlaylist', (auth, returnPlaylist) => {
        getPlaylist(auth).then(playlist => {
            returnPlaylist(playlist)
        })
    })
    socket.on('getAllPlaylists', (accessToken, returnPlaylists) => {
        getAllPlaylists(accessToken).then(playlists => {
            returnPlaylists(playlists)
        })
    })
    socket.on('userLog', (user, sendBack) => {
        userLog(user).then(userData => sendBack(userData))
    })
    socket.on('getUserClips', ({user_id, pendingClips}, sendBack) => {
        handlePendingClips(pendingClips).then(() => {
            getUserClips(user_id).then(userClips => sendBack(userClips))
        })
    })
})

http.listen(port, function(){
    console.log('socket.io listening on *:' + port)
})
