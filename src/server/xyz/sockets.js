var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
var { socketPort } = require('../../../config')
const user = require('./user')

io.on('connection', (socket) => {
    socket.on('create account', (newUser, returnObject) => {
        user.createAccount(newUser).then(account => {
            returnObject(account)
        })
    })
    socket.on('userLog', (log, sendBack) => {
        user.userLog(log)
        .then(userData => sendBack(userData))
        .catch(error => {})
    })
    socket.on('login', (loginInfo, sendBack) => {
        user.login(loginInfo)
        .then(account => sendBack(account))
        .catch(error => {})
    })
})

http.listen(socketPort.xyz, function(){
    console.log('socket.io listening on *:' + socketPort.xyz)
})
