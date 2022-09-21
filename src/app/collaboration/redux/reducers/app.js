import * as actions from '../actions'

const initialState = {
    rooms: [],
    room: null,
}

export default function app(state = initialState, action) {

    switch(action.type) {

        case actions.UPDATE_ROOM:
            return {
                ...state,
                room: action.room,
            }

        case actions.UPDATE_AVAILABLE_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
            }

        case actions.UPDATE_ROOM_MESSAGES:

            const index = rooms.findIndex(item => item.id === action.messageObject.roomID)

            let newMessages
            if (state.rooms[index].messages != undefined) {
                newMessages = [
                    ...state.rooms[index].messages,
                    action.messageObject,
                ]
            }
            else {
                newMessages = [action.messageObject]
            }

            return {
                ...state,
                rooms: [
                    ...state.rooms.slice(0, index),
                    {
                        ...state.rooms[index],
                        messages: newMessages,
                    },
                    ...state.rooms.slice(index + 1, rooms.length),

                ]
            }

        default:
            return state
    }
}
