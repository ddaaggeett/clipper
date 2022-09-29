const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const functions = require('../functions')
const user = require('./user')

const account = functions.getAppObject('account')

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

http.listen(account.socketPort, function(){
    console.log('socket.io listening on *:' + account.socketPort)
})
