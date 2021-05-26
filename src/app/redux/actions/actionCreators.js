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

export function setAccessToken(accessToken, accessExpirationTime) {
    return {
        type: actions.SET_ACCESS_TOKEN,
        accessToken,
        accessExpirationTime,
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

export function setVideoProgression(progressionObject) {
    return {
        type: actions.SET_VIDEO_PROGRESSION,
        progressionObject,
    }
}

export function updateProgressions(progressions) {
    return {
        type: actions.UPDATE_PROGRESSIONS,
        progressions,
    }
}

export function updateSourceVideo(videoObject) {
    return {
        type: actions.UPDATE_SOURCE_VIDEO,
        videoObject
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

export function setVideoSelectorFocused(focused) {
    return {
        type: actions.SET_VIDEO_SELECTOR_FOCUSED,
        focused
    }
}

export function setLeftCursor(cursor) {
    return {
        type: actions.SET_LEFT_CURSOR,
        cursor
    }
}

export function setRightCursor(cursor) {
    return {
        type: actions.SET_RIGHT_CURSOR,
        cursor
    }
}

export function setHandlingLeft(handling) {
    return {
        type: actions.SET_HANDLING_LEFT,
        handling
    }
}

export function setHandlingRight(handling) {
    return {
        type: actions.SET_HANDLING_RIGHT,
        handling
    }
}

export function setLeftClipped(clipped) {
    return {
        type: actions.SET_LEFT_CLIPPED,
        clipped
    }
}

export function setRightClipped(clipped) {
    return {
        type: actions.SET_RIGHT_CLIPPED,
        clipped
    }
}

export function setBoundCount(count) {
    return {
        type: actions.SET_BOUND_COUNT,
        count
    }
}

export function setPlayingClip(playing, contentID) {
    return {
        type: actions.SET_PLAYING_CLIP,
        playing,
        contentID
    }
}

export function setConfirmDelete(confirm) {
    return {
        type: actions.SET_CONFIRM_DELETE,
        confirm
    }
}
