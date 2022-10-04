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
        process.kill(process.pid)
    })
})
