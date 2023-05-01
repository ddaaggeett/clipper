const fs = require('fs')
const { copyFile } = require('fs/promises')
const path = require('path')
const config = require('../../config_example')
const { exec } = require('child_process')

const initFileDataDirectory = () => {
    config.apps.forEach((app, i) => {
        fs.mkdir(path.join(app.fileData), {recursive:true}, error => {
            if(error) console.error(error)
        })
    })
}

const writeConfigFile = (config) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(config.configFile, JSON.stringify(config, null, 4), (error) => {
            if(!error) resolve()
        })
    })
}

const settleIPConfig = () => {
    return new Promise((resolve,reject) => {
        exec('hostname -I | awk \'{print $1}\' | tr -d \'\n\'', (error, stdout, stderr) => {
            config.serverIP = stdout.toString()
            console.log(`LOCAL IP = ${stdout.toString()}`)
            writeConfigFile(config).then(() => resolve())
        })
    })
}

const initConfig = () => {
    return new Promise((resolve,reject) => {
        copyFile('./config_example.json',config.configFile).then(() => {
            initFileDataDirectory()
            settleIPConfig().then(() => resolve())
        })
    })
}

module.exports = initConfig
