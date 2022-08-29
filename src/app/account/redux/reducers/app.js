import * as actions from '../actions'

const initialState = {
    loggedIn: false,
    user: null,
    webapp: undefined,
    domain: undefined,
}

export default function app(state = initialState, action) {

    switch(action.type) {

        case actions.LOGIN:
            return {
                ...state,
                loggedIn: true,
                user: action.account,
            }

        case actions.LOGOUT:
            return {
                loggedIn: false,
                user: null,
            }

        case actions.UPDATE_USER:
            return {
                ...state,
                user: action.user,
            }

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
