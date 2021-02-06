var fs = require('fs')
var r = require('rethinkdb')
var { dbConnxConfig } = require('../../config')
var generateClip = require('./generateClip')

const handleIncomingClips = (incomingClips) => {
    return new Promise((resolve,reject) => {

        r.connect(dbConnxConfig).then(connection => {
            console.log(`incomingClips = ${JSON.stringify(incomingClips,null,4)}`)
            r.table('clips').insert(incomingClips, {
                returnChanges: true,
                conflict: "replace"
            }).run(connection).then(result => {
                console.log(result)
                var clips = []
                try {
                    clips = result.changes.map(item => item.new_val)
                }
                catch(error){
                    if(error.toString().includes('TypeError')) clips = [] // array not available (no changes)
                }
                resolve(clips)
            }).error(error => {
                console.log(`\nallClips error\n${error}`)
            })
        }).error(error => {
            console.log(`\ndb connection error\n${error}`)
        })
    })
}

module.exports = handleIncomingClips
