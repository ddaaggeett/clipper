/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
const express = require('express')
const app = express()
const { dbConnxConfig, expressPort, appName, serverIP, fileData } = require('../../config')
const r = require('rethinkdb')
const path = require('path')
const fs = require('fs')
const { zipClip } = require('./zip')

app.use(express.static(path.join(__dirname, '/../..', fileData)))

app.get('/:clipID', (req, res) => {
    // TODO: should be zipped already. donwload only here.
    const clipID = res.req.params.clipID
    r.connect(dbConnxConfig).then(connection => {
        r.table('clips').get(clipID).run(connection).then(response => {
            if (response != null) {

                const zipUri = path.join(path.dirname(response.clipUri), 'clip.zip')

                fs.watchFile(zipUri, (current, prev) => {
                    if (current.isFile()) {
                        fs.unwatchFile(zipUri)

                        var downloadName = ''
                        if(response.title.length == 0) downloadName = 'clip_download'
                        else downloadName = response.title
                        const downloadTo = downloadName + '.zip'
                        res.download(zipUri, downloadTo, error => {
                            if (error) console.log(error)
                        })

                    } else {
                        console.log('no thumbnail file yet')
                    }
                })

                const clipObject = {
                    ...response,
                    zipUri
                }

                zipClip(clipObject)

            }
        })
    })
})

app.listen(expressPort, (err) => {
    if (err) throw err
    console.log(`${appName} expressJS server ready on http://${serverIP}:${expressPort}`)
})
