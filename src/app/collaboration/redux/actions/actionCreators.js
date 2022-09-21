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

export const updatedRoomMessages = (messageObject) => {
    return {
        type: actions.UPDATE_ROOM_MESSAGES,
        messageObject,
    }
}
