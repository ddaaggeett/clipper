var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { port } = require('../../config')
var handleIncomingClips = require('./handleIncomingClips')
var { addClip, editClip, deleteClip } = require('./receiveSingleClip')
var fs = require('fs')
var generateClip = require('./generateClip')
var { getPlaylist, getAllPlaylists } = require('./youtube')
var { userLog } = require('./user')
require('./db')

io.on('connection', (socket) => {
    socket.on('allClips', (incomingClips, sendBack) => {
        handleIncomingClips(incomingClips).then(clips => {
            sendBack(clips)
        })
    })
    socket.on('addClip', (clip, sendBack) => {
        addClip(clip).then(clipWithID => sendBack(clipWithID))
        generateClip(clip)
    })
    socket.on('editClip', (clip, sendBack) => {
        editClip(clip).then(editedClip => sendBack(editedClip))
    })
    socket.on('deleteClip', (clip, sendBack) => {
        deleteClip(clip).then(deletedClip => sendBack(deletedClip))
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
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
