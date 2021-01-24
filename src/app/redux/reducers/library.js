import * as actions from '../actions'

const initialState = {
    selectingFromPlaylist: false,
    playlists:[],
    playlist: {
        id: null,
        title: '',
        videos: [],
    },
}

export default function library(state = initialState, action) {
    switch(action.type) {

        case actions.SELECTING_FROM_PLAYLIST:
            return {
                ...state,
                selectingFromPlaylist: action.isSelecting,
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

        default:
            return state
    }
}
