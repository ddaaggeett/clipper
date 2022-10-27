import * as actions from '../actions'

const initialState = {
}

export default function app(state = initialState, action) {
    switch(action.type) {

        case actions.SET_URI:
            return {
                ...state,
                uri: action.uri,
            }

        default:
            return state
    }
}
