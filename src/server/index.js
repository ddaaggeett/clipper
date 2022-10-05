const initConfig = require ('./configure')
const rethinkdb = require('./rethinkDB')

initConfig().then(() => {
    require('./rethinkDB')
    require('./expressServer')
    require('./sockets')
})

process.on('SIGINT', (code) => {
    rethinkdb.kill()
    .then(() => {
        // kill node process that hosts all ports
        process.kill(process.pid)
    })
})
