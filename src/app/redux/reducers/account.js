import * as actions from '../actions'

const initialState = {
    loggedIn: false,
    account: null,
}

export default function account(state = initialState, action) {
    switch(action.type) {

        case actions.LOGIN:
            console.log('REDUCER\n',action)
            return {
                ...state,
                loggedIn: true,
                account: action.account,
            }

        default:
            return state
    }
}
