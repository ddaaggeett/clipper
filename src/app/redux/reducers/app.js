import * as actions from '../actions'

const initialState = {
    webapp: undefined,
}

export default function app(state = initialState, action) {
        switch(action.type) {

        case actions.UPDATE_WEB_APP:
            return {
                ...state,
                webapp: action.app,
            }

        default:
            return state
    }
}
