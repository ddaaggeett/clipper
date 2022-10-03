const app = require('../expressServer')
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const functions = require('../functions')
const { updateClip, deleteClip, handlePendingClips } = require('./handleReceiveClips')
const { updateVideoProgress, getClips } = require('./user')
const generateClip = require('./generateClip')
const { updateSourceVideo } = require('./youtube-dl')

const clipper = functions.getAppObject('clipper')

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

http.listen(clipper.socketPort, function(){
    console.log('socket.io listening on *:' + clipper.socketPort)
})
