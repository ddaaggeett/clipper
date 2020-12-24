var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')

io.on('connection', (socket) => {
    socket.on('clip', (clip) => {
        console.log(clip)
        // TODO: youtube-dl clip.videoId
    })
})

http.listen(port, function(){
    console.log('listening on *:' + port)
})
