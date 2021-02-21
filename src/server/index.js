var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { port } = require('../../config')
var handleIncomingClips = require('./handleIncomingClips')
var { addClip, editClip, deleteClip } = require('./receiveSingleClip')
var fs = require('fs')
var generateClip = require('./generateClip')
var { getPlaylist, getAllPlaylists } = require('./youtube')
var { userLog, getUserClips } = require('./user')
require('./db')

io.on('connection', (socket) => {
    socket.on('allClips', (incomingClips, sendBack) => {
        handleIncomingClips(incomingClips).then(clips => {
            sendBack(clips)
        })
    })
    socket.on('addClip', clip => {
        addClip(clip).then(clipWithID => io.emit('updateClip',clipWithID))
        generateClip(clip)
    })
    socket.on('editClip', clip => {
        editClip(clip).then(editedClip => io.emit('updateClip',editedClip))
    })
    socket.on('deleteClip', clip => {
        deleteClip(clip).then(deletedClip => io.emit('deleteClip',deletedClip))
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
    socket.on('getUserClips', (user_id, sendBack) => {
        getUserClips(user_id).then(userClips => sendBack(userClips))
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
