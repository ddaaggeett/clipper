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
        account,
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

export function setAccessToken(accessToken, accessExpirationTime) {
    return {
        type: actions.SET_ACCESS_TOKEN,
        accessToken,
        accessExpirationTime,
    }
}

export function selectingFromPlaylist(isSelecting) {
    return {
        type: actions.SELECTING_FROM_PLAYLIST,
        isSelecting,
    }
}

export function addClip(clip) {
    return {
        type: actions.ADD_CLIP,
        clip,
    }
}

export function updateClip(clip, index) {
    return {
        type: actions.UPDATE_CLIP,
        clip,
        index,
    }
}

export function setWebPanelWidth(width) {
    return {
        type: actions.SET_WEB_PANEL_WIDTH,
        width,
    }
}

export function setEditIndex(index) {
    return {
        type: actions.SET_EDIT_INDEX,
        index,
    }
}

export function updateUser(user) {
    return {
        type: actions.UPDATE_USER,
        user,
    }
}
