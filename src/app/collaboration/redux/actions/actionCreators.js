import * as actions from '.'

export const updateRoom = (room) => {
    return {
        type: actions.UPDATE_ROOM,
        room,
    }
}
