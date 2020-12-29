var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')
var handleIncomingClips = require('./handleIncomingClips')
var fs = require('fs')
var initData = require('./initData')

var data
initData().then(storage => data = storage)

io.on('connection', (socket) => {
    socket.on('clips', (clips, confirmReceived) => {
        confirmReceived(true)
        handleIncomingClips(clips, data)
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
