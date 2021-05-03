import * as actions from '../actions'
import { userProgressBookmarkListLength } from '../../../../config'

const initialState = {
    selectingFromPlaylist: false,
    selectingUnfinishedVideo: false,
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

            if (action.progressionObject.progress == null) return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions.slice(0,index),
                    ...state.videoProgressions.slice(index + 1, state.videoProgressions.length)
                ]
            }
            else if (index == -1) {
                if (state.videoProgressions.length < userProgressBookmarkListLength) return {
                    ...state,
                    videoProgressions: [
                        action.progressionObject,
                        ...state.videoProgressions
                    ]
                }
                else return {
                    ...state,
                    videoProgressions: [
                        action.progressionObject,
                        ...state.videoProgressions.slice(0, userProgressBookmarkListLength - 1)
                    ]
                }
            }
            else return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions.slice(0,index),
                    action.progressionObject,
                    ...state.videoProgressions.slice(index + 1, state.videoProgressions.length)
                ]
            }

        case actions.SELECTING_UNFINISHED_VIDEO:
            return {
                ...state,
                selectingUnfinishedVideo: action.selecting
            }

        default:
            return state
    }
}
