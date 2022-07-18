const express = require('express')
const app = express()
const { audioExpress } = require('./audio/express')
const { clipperExpress } = require('./clipper/express')
const whitesocketExpress = require('./whitesocket/express')
const { expressPort, appName, serverIP } = require('../../config')

clipperExpress(app)
audioExpress(app)
whitesocketExpress(app)

app.listen(expressPort, (err) => {
    if (err) throw err
    console.log(`${appName} expressJS server ready on http://${serverIP}:${expressPort}`)
})
