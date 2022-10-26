const app = require('../expressServer')
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const functions = require('../functions')
const { updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
const { updateVideoProgress, getClips } = require('./user')
const generateClip = require('./generateClip')
const { updateSourceVideo } = require('./youtube')

const clipper = functions.getAppObject('clipper')

io.on('connection', (socket) => {
    socket.on('videoProgress', videoObject => {
        updateVideoProgress(videoObject)
        .then(progressions => {
            socket.broadcast.emit('videoProgressions', progressions)
        })
    })
    socket.on('updateSourceVideo', (videoObject, returnToSender) => {
        updateSourceVideo(videoObject)
        .then(videoObject => {
            // returnToSender(videoObject)
            // socket.broadcast.emit('updateSourceVideo',videoObject)
            io.emit('updateSourceVideo', videoObject)
        })
    })
    socket.on('reClip', (clipObject, callback) => {
        generateClip(clipObject)
        .then(updatedClip => {
            callback(updatedClip)
        })
    })
    socket.on('updateClip', (clip, callback) => {
        updateClip(clip)
        .then(updatedClip => {
            callback(updatedClip)
        })
    })
    socket.on('deleteClip', (clip, callback) => {
        deleteClip(clip)
        .then(deletedClip => {
            callback(deletedClip)
        })
    })
    socket.on('getUserClips', ({user, pendingClips}, callback) => {
        handlePendingClips(pendingClips).then(() => {
            getClips(user.id)
            .then(userClips => callback(userClips))
        })
    })
})

http.listen(clipper.socketPort, function(){
    console.log('socket.io listening on *:' + clipper.socketPort)
})
