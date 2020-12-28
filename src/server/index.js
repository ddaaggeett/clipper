var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var { port } = require('../../config')
var handleClip = require('./handleClip')
var fs = require('fs')

const dataFile = __dirname + "/data.json"
var data
fs.readFile(dataFile, (error, jsonString) => {
    if (!error) {
        if (jsonString) {
            // console.log(JSON.parse(jsonString))
            data = JSON.parse(jsonString)
        }
    }
    else {
        if ( error.code === "ENOENT" ) { // file doesn't exist
            console.log("ERROR\n",error)
            fs.writeFile(dataFile, JSON.stringify({}), (error) => {
                if(error) console.log(error)
                else console.log("file created @ ", dataFile)
            })
        }
    }
})

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
