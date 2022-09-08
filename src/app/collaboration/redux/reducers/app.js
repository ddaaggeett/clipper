import * as actions from '../actions'

const initialState = {
    rooms: [],
    room: null,
    messages: [],
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

        default:
            return state
    }
}
