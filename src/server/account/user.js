var r = require('rethinkdb')
var { dbConnxConfig, progressionsListLength } = require('../../../config')

const login = (loginInfo) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(loginInfo.id).run(connection)
            .then(account => {
                if (loginInfo.password === account.password) resolve(account)
                else resolve(null)
            })
            .catch(error => resolve(null))
        })
    })
}

const userLog = (user) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').insert(user, {
                returnChanges: true,
                conflict: "update"
            }).run(connection).then(result => {
                r.table('users').get(user.id).run(connection)
                .then(userData => resolve(userData))
                .catch(error => {
                    console.log(`\nERROR getting user data\n${error}`)
                    reject(error)
                })
            })
            .catch(error => {
                console.log(`\nERROR user data retrieval\n${error}`)
                reject(error)
            })
        })
        .catch(error => {
            console.log(`\ndb connection error\n${error}`)
            reject(error)
        })
    })
}

const createAccount = (account) => {
    return new Promise((resolve, reject) => {
        checkIfAccountExists(account.id).then(exists => {
            if (exists) resolve(null)
            else r.connect(dbConnxConfig).then(connection => {
                r.table('users').insert(account, { returnChanges: true }).run(connection).then(object => {
                    const account = object.changes[0].new_val
                    resolve(account)
                })
            })
        })
    })
}

const checkIfAccountExists = (userID) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(userID).run(connection).then(user => {
                if (user == null) resolve(false)
                else resolve(true)
            })
        })
    })
}

module.exports = {
    login,
    userLog,
    createAccount
}
