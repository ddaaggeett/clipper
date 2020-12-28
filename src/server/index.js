var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')
var handleClip = require('./handleClip')

io.on('connection', (socket) => {
    socket.on('clip', (clipObject, confirmReceived) => {
        console.log('clipObject: ', clipObject)
        handleClip(clipObject)
        confirmReceived(true)
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
