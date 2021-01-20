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
