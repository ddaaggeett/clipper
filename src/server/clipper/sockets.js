var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { socketPort } = require('../../../config')
var { updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
const { updateVideoProgress, getClips } = require('./user')
var generateClip = require('./generateClip')
const { updateSourceVideo } = require('./youtube-dl')

io.on('connection', (socket) => {
    socket.on('videoProgress', videoObject => {
        updateVideoProgress(videoObject).then(progressions => {
            socket.broadcast.emit('videoProgressions', progressions)
        })
    })
    socket.on('updateSourceVideo', (videoObject, returnToSender) => {
        updateSourceVideo(videoObject).then(videoObject => {
            // returnToSender(videoObject)
            // socket.broadcast.emit('updateSourceVideo',videoObject)
            io.emit('updateSourceVideo', videoObject)
        })
    })
    socket.on('reClip', clipObject => generateClip(clipObject))
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
    socket.on('getUserClips', ({user, pendingClips}, sendBack) => {
        handlePendingClips(pendingClips).then(() => {
            getClips(user.id).then(userClips => sendBack(userClips))
        })
    })
})

http.listen(socketPort.clipper, function(){
    console.log('socket.io listening on *:' + socketPort.clipper)
})
