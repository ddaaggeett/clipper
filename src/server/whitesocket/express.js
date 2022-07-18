const express = require('express')
const path = require('path')
const { fileData } = require('../../../config')

const whitesocketExpress = (app) => {
    app.use(express.static(path.join(__dirname, '/../../..', fileData.imageData)))
}

module.exports = whitesocketExpress
