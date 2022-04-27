const initConfig = require ('./configure')

initConfig().then(() => {
    require('./rethinkDB')
    require('./expressServer')
    require('./sockets')
})
