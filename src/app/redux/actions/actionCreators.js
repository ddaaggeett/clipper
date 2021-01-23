import * as actions from '.'

export function updateClips(clips) {
    return {
        type: actions.UPDATE_CLIPS,
        clips
    }
}

export function updateSpeed(speed) {
    return {
        type: actions.UPDATE_SPEED,
        speed
    }
}

export function updateContentID(contentID) {
    return {
        type: actions.UPDATE_CONTENT_ID,
        contentID
    }
}

export function login(account) {
    return {
        type: actions.LOGIN,
        account
    }
}

export function logout() {
    return {
        type: actions.LOGOUT
    }
}

export function setPlaylists(playlists) {
    return {
        type: actions.SET_PLAYLISTS,
        playlists
    }
}

export function setPlaylist(playlist) {
    return {
        type: actions.SET_PLAYLIST,
        playlist
    }
}

export function setAccessToken(accessToken, accessTokenExpirationDate) {
    return {
        type: actions.SET_ACCESS_TOKEN,
        accessToken,
        accessTokenExpirationDate,
    }
}
