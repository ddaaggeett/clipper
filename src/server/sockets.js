/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { socketPort } = require('../../config')
var { updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
const user = require('./user')
var generateClip = require('./generateClip')
const { updateSourceVideo } = require('./youtube-dl')

io.on('connection', (socket) => {
    socket.on('videoProgress', videoObject => {
        user.updateVideoProgress(videoObject).then(progressions => {
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
    socket.on('userLog', (user, sendBack) => {
        user.userLog(user).then(userData => sendBack(userData))
    })
    socket.on('getUserClips', ({userID, pendingClips}, sendBack) => {
        handlePendingClips(pendingClips).then(() => {
            user.getClips(userID).then(userClips => sendBack(userClips))
        })
    })
    socket.on('create account', (account, returnObject) => {
        user.createAccount(account).then(object => {
            returnObject(object)
        })
    })
})

http.listen(socketPort, function(){
    console.log('socket.io listening on *:' + socketPort)
})
