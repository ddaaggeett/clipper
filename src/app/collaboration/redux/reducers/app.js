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

            const index = state.rooms.findIndex(item => item.id === action.message.roomID)

            let newMessages
            if (state.rooms[index].messages.length != 0) {
                newMessages = [
                    ...state.rooms[index].messages,
                    action.message,
                ]
            }
            else {
                newMessages = [action.message]
            }

            return {
                ...state,
                rooms: [
                    ...state.rooms.slice(0, index),
                    {
                        ...state.rooms[index],
                        messages: newMessages,
                    },
                    ...state.rooms.slice(index + 1, state.rooms.length),

                ]
            }

        default:
            return state
    }
}
