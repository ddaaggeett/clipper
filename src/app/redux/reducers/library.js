import * as actions from '../actions'

const initialState = {
    selectingFromPlaylist: false,
    playlists:[],
    playlist: {
        id: null,
        title: '',
        videos: [],
    },
    videoProgressions: [],
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

        case actions.SET_VIDEO_PROGRESSION:

            var index = state.videoProgressions.findIndex(item => item.videoId === action.progressionObject.videoId)

            if (index == -1) return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions,
                    action.progressionObject
                ]
            }
            else return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions.slice(0,index),
                    action.progressionObject,
                    ...state.videoProgressions.slice(index + 1, state.videoProgressions.length)
                ]
            }

        default:
            return state
    }
}
