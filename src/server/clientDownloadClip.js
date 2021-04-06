const express = require('express')
const app = express()
const { dbConnxConfig, nextAppPort, appName } = require('../../config')
const r = require('rethinkdb')
const path = require('path')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextapp = next({ dev })
const handle = nextapp.getRequestHandler()

nextapp.prepare().then(() => {

    app.get('/:clipID', (req, res) => {
        const clipID = res.req.params.clipID
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clipID).run(connection).then(response => {
                if (response != null) {
                    const filePath = response.serverUri
                    var downloadName = ''
                    if(response.title.length == 0) downloadName = '_'
                    else downloadName = response.title
                    const downloadTo = downloadName + '.mp4'
                    res.download(filePath, downloadTo, error => {
                        if (error) console.log(error)
                    })
                }
            })
        })
    })

    app.get('*', (req, res) => {
        return handle(req, res)
    })

    app.listen(nextAppPort, (err) => {
        if (err) throw err
        console.log(`${appName} ready on http://localhost:${nextAppPort}`)
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})
