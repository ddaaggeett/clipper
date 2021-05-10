var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { socketPort } = require('../../config')
var { updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
var { userLog, getUserClips } = require('./user')
var generateClip = require('./generateClip')
const { updateSourceVideo } = require('./sourceVideo')

io.on('connection', (socket) => {
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
    socket.on('userLog', (user, sendBack) => {
        userLog(user).then(userData => sendBack(userData))
    })
    socket.on('getUserClips', ({user_id, pendingClips}, sendBack) => {
        handlePendingClips(pendingClips).then(() => {
            getUserClips(user_id).then(userClips => sendBack(userClips))
        })
    })
})

http.listen(socketPort, function(){
    console.log('socket.io listening on *:' + socketPort)
})
