module.exports = {
    appName: 'clipper',
    webClientId: 'webClientId',
    webClientSecret: 'webClientSecret',
    androidClientId: 'androidClientId',
    serverIP: 'ip address',
    socketPort: 'port number',
    expressPort: 'port number',
    videoDataDirectory: '../clipper_data/',
    clipInitObject: {
        start: 0,
        end: 0,
        duration: 0,
        videoId: '',
        title: '',
        thumbnailText: '',
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
    sourceCodeURL: `https://github.com/ddaaggeett/clipper`,
}
