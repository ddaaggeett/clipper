var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')
var handleClip = require('./handleClip')

io.on('connection', (socket) => {
    socket.on('clip', (clipObject) => {
        console.log('clipObject: ', clipObject)
        handleClip(clipObject)
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
