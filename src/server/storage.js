var fs = require('fs')
var { dataFile } = require('../../config')

const initData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFile, (error, jsonString) => {
            if (!error) resolve(JSON.parse(jsonString))
            else if ( error.code === "ENOENT" ) { // file doesn't exist
                console.log('creating data file')
                const newFileObject = {
                    "clips":[],
                }
                storeData(newFileObject).then(() => resolve(newFileObject))
            }
        })
    })
}

const storeData = (data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(dataFile, JSON.stringify(data, null, 4), (error) => {
            if(error) console.log('ERROR writing file:', error)
            else resolve()
        })
    })
}

module.exports = {
    initData,
    storeData,
}
