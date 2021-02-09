module.exports = {
    webClientId: 'webClientId',
    webClientSecret: 'webClientSecret',
    androidClientId: 'androidClientId',
    serverIP: 'ip address',
    port: 'port number',
    dataFile: '../data/data.json',
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
        clips: 'clips'
    },
    dbConnxConfig: {
        db: 'clipper',
    },
}
