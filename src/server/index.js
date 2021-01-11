var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')
var handleIncomingClips = require('./handleIncomingClips')
var {
    addClip,
    editClip,
    deleteClip,
} = require('./receiveSingleClip')
var fs = require('fs')
var { initData } = require('./storage')
var generateClip = require('./generateClip')

var serverData
initData().then(storage => serverData = storage)

io.on('connection', (socket) => {
    socket.on('allClips', (incomingClips, confirmReceived) => {
        confirmReceived(true)
        handleIncomingClips(incomingClips, serverData).then(newData => serverData = newData)
    })
    socket.on('addClip', (clip, confirmReceived) => {
        confirmReceived(true)
        addClip(clip, serverData).then(newData => serverData = newData)
        generateClip(clip)
    })
    socket.on('editClip', (clip, confirmReceived) => {
        confirmReceived(true)
        editClip(clip, serverData).then(newData => serverData = newData)
    })
    socket.on('deleteClip', (clip, confirmReceived) => {
        confirmReceived(true)
        deleteClip(clip, serverData).then(newData => serverData = newData)
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
