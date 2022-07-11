var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { socketPort } = require('../../../config')

io.on('connection', (socket) => {
})

http.listen(socketPort.audio, function(){
    console.log('socket.io listening on *:' + socketPort.audio)
})
