const express = require('express')
const path = require('path')
const functions = require('../functions')

const whitesocket = functions.getAppObject('whitesocket')

const whitesocketExpress = (app) => {
    app.use(express.static(path.join(__dirname, '/../../..', whitesocket.fileData)))
}

module.exports = whitesocketExpress
