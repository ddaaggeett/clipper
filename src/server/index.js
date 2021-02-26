var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { port } = require('../../config')
var { addClip, updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
var fs = require('fs')
var generateClip = require('./generateClip')
var { getPlaylist, getAllPlaylists } = require('./youtube')
var { userLog, getUserClips } = require('./user')
require('./db')

io.on('connection', (socket) => {
    socket.on('addClip', (clip, returnToSender) => {
        addClip(clip).then(clipWithID => {
            returnToSender(clipWithID)
            socket.broadcast.emit('updateClip',clipWithID)
        })
        generateClip(clip)
    })
    socket.on('editClip', (clip, returnToSender) => {
        updateClip(clip).then(editedClip => {
            returnToSender(editedClip)
            socket.broadcast.emit('updateClip',editedClip)
        })
    })
    socket.on('deleteClip', clip => {
        deleteClip(clip).then(deletedClip => socket.broadcast.emit('deleteClip',deletedClip))
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
    console.log('listening on *:' + port)
})
