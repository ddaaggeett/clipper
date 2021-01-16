import * as actions from '../actions'

const initialState = {
    loggedIn: false
}

export default function account(state = initialState, action) {
    switch(action.type) {

        case actions.LOGIN:
            return {
                loggedIn: true,
                ...action.account,
            }

        case actions.LOGOUT:
            return {
                loggedIn: false
            }

        default:
            return state
    }
}
