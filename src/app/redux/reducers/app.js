import * as actions from '../actions'

const initialState = {
    webapp: undefined,
    domain: undefined,
}

export default function app(state = initialState, action) {

    switch(action.type) {

        case actions.UPDATE_WEB_APP:
            return {
                ...state,
                webapp: action.app,
            }

        case actions.UPDATE_DOMAIN:
            return {
                ...state,
                domain: action.domain,
            }

        default:
            return state
    }
}
