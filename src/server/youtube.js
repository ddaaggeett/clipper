const { google } = require('googleapis')
const { playlistId } = require('../../config')

const getPlaylist = (auth) => {
    return new Promise((resolve,reject) => {

        // TODO: implement refresh_token

        const youtube = google.youtube({
            version: 'v3',
            // auth: auth.apiKey,
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })

        var playlist = []
        youtube.playlistItems.list({
            // part:'contentDetails',
            part:'snippet',
            mine: true,
            playlistId: playlistId,
            maxResults: 50,
        }).then(response => {
            response.data.items.forEach((item, i) => {
                const videoObject = {
                    videoId: item.snippet.resourceId.videoId,
                    thumbnails: item.snippet.thumbnails,
                    title: item.snippet.title,
                }
                playlist.push(videoObject)
            })
            resolve(playlist)
        }).catch(error => {
            console.log(`youtube error:\n${error}`)
        })

    })
}

module.exports = {
    getPlaylist,
}
