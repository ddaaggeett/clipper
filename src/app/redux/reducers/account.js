import * as actions from '../actions'

const initialState = {
    loggedIn: false,
    user: {},
    accessToken: '',
    accessExpirationTime: 0,
    refreshToken: '',
}

export default function account(state = initialState, action) {
    switch(action.type) {

        case actions.LOGIN:
            return {
                ...state,
                loggedIn: true,
                ...action.account,
                accessExpirationTime: action.accessExpirationTime,
            }

        case actions.LOGOUT:
            return {
                loggedIn: false
            }

        case actions.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
                accessExpirationTime: action.accessExpirationTime,
            }

        default:
            return state
    }
}
