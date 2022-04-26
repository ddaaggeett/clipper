/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
const initConfig = require ('./configure')

initConfig().then(() => {
    require('./rethinkDB')
    require('./expressServer')
    require('./sockets')
})
