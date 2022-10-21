var r = require('rethinkdb')
var { dbConnxConfig } = require('../../../config')

const filterOutPW = (account) => {
    return {
        id: account.id,
        email: account.email,
        name: account.name,
    }
}

const login = (loginInfo) => {
    return new Promise((resolve, reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('users').get(loginInfo.id).run(connection)
            .then(account => {
                if (loginInfo.password === account.password) {
                    resolve(filterOutPW(account))
                }
                else resolve(null)
            })
            .catch(error => resolve(null))
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
                    resolve(filterOutPW(account))
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
    createAccount
}
