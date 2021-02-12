var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')
var editVideoFileName = require('./editVideoFileName')

const addClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').insert(clip, { returnChanges: true }).run(connection).then(result => {
                console.log(`\naddClip result\n${JSON.stringify(result,null,4)}`)
                resolve(result.changes[0].new_val)
            }).error(error => {
                console.log(`\naddClip error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const editClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clip.id).replace(clip, { returnChanges: true }).run(connection).then(result => {
                if(result.changes[0].new_val.title !== result.changes[0].old_val.title) editVideoFileName(result.changes[0].new_val)
                console.log(`\neditClip result\n${JSON.stringify(result,null,4)}`)
                resolve(result.changes[0].new_val)
            }).error(error => {
                console.log(`\neditClip error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

const deleteClip = (clip) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').get(clip.id).delete({ returnChanges: true }).run(connection).then(result => {
                console.log(`\ndeleteClip result\n${JSON.stringify(result,null,4)}`)
                resolve(result.changes[0].old_val)
            }).error(error => {
                console.log(`\ndeleteClip error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

module.exports = {
    addClip,
    editClip,
    deleteClip,
}
