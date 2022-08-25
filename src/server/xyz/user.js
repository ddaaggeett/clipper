var r = require('rethinkdb')
var { dbConnxConfig, progressionsListLength } = require('../../../config')

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
            if (exists) resolve({
                message: 'account already exists',
            })
            else r.connect(dbConnxConfig).then(connection => {
                r.table('users').insert(account, { returnChanges: true }).run(connection).then(user => {
                    resolve({
                        message: 'success',
                    })
                })
            })
        })
    })
}

const checkIfAccountExists = (userID) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(userID).run(connection).then(user => {

                if (user == null) {
                    console.log(`new user = ${JSON.stringify(user,null,4)}`)
                    resolve(false)
                }
                else {
                    console.log(`user exists already\n${JSON.stringify(user,null,4)}`)
                    resolve(true)
                }
            })
        })
    })
}

module.exports = {
    userLog,
    createAccount
}
