const app = require('../expressServer')
const functions = require('../functions')
const diff = require('./diff')
const user = require('./user')

const whitesocket = functions.getAppObject('whitesocket')

var http = require('http').Server(app)
var io = require('socket.io')(http, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    maxHttpBufferSize: 1e8, // for expo camera image quality: 1.0
})

io.on('connection', (socket) => {
    socket.on('syncUserState', appState => user.save(appState))
    socket.on('capture', (data, returnToSender) => {
        diff.handle(data)
        .then(object => io.emit('updateCurrent', object))
        .catch(error => {
            if(error === 'recapture') returnToSender(error)
        })
    })
    socket.on('prepCapture', () => io.emit('prepCapture'))
    socket.on('capturePrepped', () => io.emit('capturePrepped'))
})

http.listen(whitesocket.socketPort, function(){
    console.log('socket.io listening on *:' + whitesocket.socketPort)
})
