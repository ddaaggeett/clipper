import * as actions from '.'

export function updateClips(clips) {
    return {
        type: actions.UPDATE_CLIPS,
        clips
    }
}

export function updatePlayer(player) {
    return {
        type: actions.UPDATE_PLAYER,
        player
    }
}
