const app = require('../expressServer')
const http = require('http').Server(app)
const io = require('socket.io')(http, { cors: { origin: "*", methods: ["GET", "POST"] } })
const functions = require('../functions')
const user = require('./user')

const account = functions.getAppObject('account')

io.on('connection', (socket) => {
    socket.on('create account', (newUser, callback) => {
        user.createAccount(newUser)
        .then(account => callback(account))
        .catch(error => {})
    })
    socket.on('login', (loginInfo, callback) => {
        user.login(loginInfo)
        .then(account => callback(account))
        .catch(error => {})
    })
})

http.listen(account.socketPort, function(){
    console.log('socket.io listening on *:' + account.socketPort)
})
