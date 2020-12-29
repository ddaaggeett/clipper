var fs = require('fs')
var { dataFileName } = require('../../config')

const dataFile = __dirname + "/" + dataFileName
const initData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFile, (error, jsonString) => {
            if (!error) resolve(JSON.parse(jsonString))
            else if ( error.code === "ENOENT" ) { // file doesn't exist
                console.log("ERROR\n",error)
                const newFileObject = {
                    "clips":[],
                }
                fs.writeFile(dataFile, JSON.stringify(newFileObject), (error) => {
                    if(!error) resolve(newFileObject)
                })
            }
        })
    })
}

module.exports = initData
