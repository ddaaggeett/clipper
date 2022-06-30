const process = require('process')
var r = require('rethinkdb')
var {
    tables,
    dbConnxConfig,
} = require('../../config')
const { spawn } = require('child_process')
var dbConnx = null

const createTables = (tables) => {
    for(var table in tables) {
        r.db(dbConnxConfig.db).tableCreate(table).run(dbConnx)
        .then(result => {
            console.log(`\nTABLE RESULT:\n${JSON.stringify(result)}`)
        })
        .error(error => {
            console.log(`\n${error}`)
        })
    }
}

const initDB = () => {
    r.connect(dbConnxConfig)
    .then(connection => {
        dbConnx = connection
        r.dbCreate(dbConnxConfig.db).run(connection)
        .then(result => {
            console.log(`\nDB RESULT:\n${JSON.stringify(result)}`)
            createTables(tables)
        })
        .error(error => {
            console.log(`\n${error}`)
            createTables(tables)
        })
    })
    .error(error => {
        console.log('\nError connecting to RethinkDB!\n',error)
    })
}

const rethinkdb = spawn('rethinkdb',[])
rethinkdb.stdout.on('data', data => {
    console.log(`\nRethinkDB output\n${data}`)
    initDB()
})
rethinkdb.stderr.on('data', error => {
    console.error(`\nERROR starting RethinkDB\n${error}`)
})
process.on('exit', (code) => {
    rethinkdb.kill()
})
