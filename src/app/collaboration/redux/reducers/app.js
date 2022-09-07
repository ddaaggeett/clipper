import * as actions from '../actions'

const initialState = {
    rooms: ['A','B'], // TODO: init []
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

        default:
            return state
    }
}
