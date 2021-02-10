var fs = require('fs')
var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')
var generateClip = require('./generateClip')

const handleIncomingClips = (incomingClips) => {
    return new Promise((resolve,reject) => {
        r.connect(dbConnxConfig).then(connection => {
            r.table('clips').insert(incomingClips, {
                returnChanges: true,
                conflict: "replace"
            }).run(connection).then(result => {
                r.table('clips').run(connection).then(result => {
                    clips = result._responses[0].r
                    resolve(clips)
                })
            }).error(error => {
                console.log(`\nallClips error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

module.exports = handleIncomingClips
