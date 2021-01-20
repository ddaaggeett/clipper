import * as actions from '../actions'

const initialState = {
    loggedIn: false,
    playlists:[],
    playlist: [],
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

        case actions.SET_PLAYLISTS:
            return {
                ...state,
                playlists: action.playlists,
            }

        case actions.SET_PLAYLIST:
            return {
                ...state,
                playlist: action.playlist,
            }

        default:
            return state
    }
}
