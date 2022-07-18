const express = require('express')
const app = express()
const podware = require('./podware/express')
const clipper = require('./clipper/express')
const whitesocket = require('./whitesocket/express')
const { expressPort, appName, serverIP } = require('../../config')

clipper(app)
podware(app)
whitesocket(app)

app.listen(expressPort, (err) => {
    if (err) throw err
    console.log(`${appName} expressJS server ready on http://${serverIP}:${expressPort}`)
})
