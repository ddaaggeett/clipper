const { google } = require('googleapis')

const youtube = (auth) => {
    return google.youtube({
        version: 'v3',
        // auth: info.apiKey,
        headers: {
            Authorization: `Bearer ${auth}`,
        },
    })
}

const getPlaylist = async (info) => {
    return new Promise((resolve,reject) => {
        var playlist = []
        youtube(info.accessToken).playlistItems.list({
            // part:'contentDetails',
            part:'snippet',
            mine: true,
            playlistId: info.playlist.id,
            maxResults: 50, // TODO: create more arrays for more content
        }).then(response => {
            response.data.items.forEach((item, i) => {
                getChannelTitle(item.snippet.resourceId.videoId, info.accessToken).then(channelTitle => {
                    const videoObject = {
                        id: item.snippet.resourceId.videoId,
                        thumbnails: item.snippet.thumbnails,
                        title: item.snippet.title,
                        channelTitle: channelTitle,
                    }
                    playlist.push(videoObject)
                    if((response.data.items.length - 1) == i) {
                        resolve(playlist)
                    }
                })
            })
        }).catch(error => {
            console.log(`youtube error:\n${error}`)
        })

    })
}

const getChannelTitle = (videoId, auth) => {
    return new Promise((resolve, reject) => {
        youtube(auth).videos.list({
            part: 'snippet',
            id: videoId,
        }).then(response => {
            resolve(response.data.items[0].snippet.channelTitle)
        })
    })
}

const getAllPlaylists = (accessToken) => {
    return new Promise((resolve,reject) => {
        var playlists = []
        youtube(accessToken).playlists.list({
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
