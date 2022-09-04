const process = require('process')
var r = require('rethinkdb')
var {
    tables,
    dbConnxConfig,
} = require('../../config')
const { spawn } = require('child_process')
var dbConnx = null

const printUnhandledError = (error) => {
    return new  Promise((resolve, reject) => {
        if (!error.message.includes('already exists')) {
            console.log(`\n${error.message}`)
            resolve()
        }
    })
}

const createTables = (tables) => {
    for(var table in tables) {
        r.db(dbConnxConfig.db).tableCreate(table).run(dbConnx)
        .then(result => {
            console.log(`\nTABLE RESULT:\n${JSON.stringify(result)}`)
        })
        .error(error => printUnhandledError(error))
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
            printUnhandledError(error)
            createTables(tables)
        })
    })
    .error(error => {
        console.log('\nError connecting to RethinkDB!\n',error)
    })
}

// TODO: this doesn't necessarily work. still continues to run sometimes.
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
