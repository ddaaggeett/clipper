const { google } = require('googleapis')

const getPlaylist = (info) => {
    return new Promise((resolve,reject) => {

        // TODO: implement refresh_token

        const youtube = google.youtube({
            version: 'v3',
            // auth: info.apiKey,
            headers: {
                Authorization: `Bearer ${info.accessToken}`,
            },
        })

        var playlist = []
        youtube.playlistItems.list({
            // part:'contentDetails',
            part:'snippet',
            mine: true,
            playlistId: info.playlist.id,
            maxResults: 50,
        }).then(response => {
            response.data.items.forEach((item, i) => {
                const videoObject = {
                    id: item.snippet.resourceId.videoId,
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

const getAllPlaylists = (accessToken) => {
    return new Promise((resolve,reject) => {
        const youtube = google.youtube({
            version: 'v3',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        var playlists = []
        youtube.playlists.list({
            part:'snippet',
            mine: true,
            maxResults: 50,
        }).then(response => {

            response.data.items.forEach((item, i) => {
                const playlist = {
                    id: item.id,
                    title: item.snippet.title,
                }
                playlists.push(playlist)
            })
            resolve(playlists)
        }).catch(error => {
            console.log(`youtube error:\n${error}`)
        })
    })
}

module.exports = {
    getPlaylist,
    getAllPlaylists,
}
