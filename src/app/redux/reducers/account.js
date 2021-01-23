import * as actions from '../actions'

const initialState = {
    loggedIn: false,
    playlists:[],
    playlist: {
        id: null,
        title: '',
        videos: [],
    },
}

export default function account(state = initialState, action) {
    switch(action.type) {

        case actions.LOGIN:
            return {
                ...state,
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
                playlist: {
                    ...state.playlist,
                    ...action.playlist,
                }
            }

        case actions.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
                accessTokenExpirationDate: action.accessTokenExpirationDate,
            }

        default:
            return state
    }
}
