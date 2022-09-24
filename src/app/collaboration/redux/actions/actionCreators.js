import * as actions from '.'

export const updateRoom = (room) => {
    return {
        type: actions.UPDATE_ROOM,
        room,
    }
}

export const updateAvailableRooms = (rooms) => {
    return {
        type: actions.UPDATE_AVAILABLE_ROOMS,
        rooms,
    }
}

export const updateRoomMessages = (message) => {
    return {
        type: actions.UPDATE_ROOM_MESSAGES,
        message,
    }
}
