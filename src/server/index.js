var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')
var handleIncomingClips = require('./handleIncomingClips')
var fs = require('fs')
var initData = require('./initData')

var serverData
initData().then(storage => serverData = storage)

io.on('connection', (socket) => {
    socket.on('clips', (incomingClips, confirmReceived) => {
        confirmReceived(true)
        handleIncomingClips(incomingClips, serverData).then(newData => serverData = newData)
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
