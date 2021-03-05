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

export function updateClip(clip) {
    return {
        type: actions.UPDATE_CLIP,
        clip,
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

export function setVideoProgress(progress) {
    return {
        type: actions.SET_VIDEO_PROGRESS,
        progress,
    }
}

export function addPendingClip(clip) {
    return {
        type: actions.ADD_PENDING_CLIP,
        clip,
    }
}

export function updatePendingClip(clip) {
    return {
        type: actions.UPDATE_PENDING_CLIP,
        clip,
    }
}

export function clearPending() {
    return {
        type: actions.CLEAR_PENDING
    }
}

export function fulfillPendingClip(clip) {
    return {
        type: actions.FULFILL_PENDING_CLIP,
        clip
    }
}

export function pendingDeleteClip(clip) {
    return {
        type: actions.PENDING_DELETE_CLIP,
        clip
    }
}

export function deleteClip(clip) {
    return {
        type: actions.DELETE_CLIP,
        clip
    }
}

export function fulfillPendingDelete(clip) {
    return {
        type: actions.FULFILL_PENDING_DELETE,
        clip
    }
}

export function setGotSomethingCursor(cursor) {
    return {
        type: actions.SET_GOT_SOMETHING_CURSOR,
        cursor
    }
}
