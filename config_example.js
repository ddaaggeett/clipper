module.exports = {
    webClientId: 'webClientId',
    webClientSecret: 'webClientSecret',
    androidClientId: 'androidClientId',
    serverIP: 'ip address',
    port: 'port number',
    videoDataDirectory: '../data/video_data/',
    clipInitObject: {
        start: 0,
        end: 0,
        duration: 0,
        videoId: '',
        title: '',
        comment: '',
        who: '',
    },
    db: 'clipper',
    tables: {
        clips: 'clips',
        users: 'users',
    },
    dbConnxConfig: {
        db: 'clipper',
    },
}
