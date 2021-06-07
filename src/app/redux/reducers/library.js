import * as actions from '../actions'
import { progressionsListLength } from '../../../../config'

const initialState = {
    videoProgressions: [],
}

export default function library(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_PROGRESSIONS:
            return {
                ...state,
                videoProgressions: action.progressions,
            }

        case actions.SET_VIDEO_PROGRESSION:

            var index = state.videoProgressions.findIndex(item => item.videoID === action.progressionObject.videoID)

            if (action.progressionObject.progress == null) return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions.slice(0,index),
                    ...state.videoProgressions.slice(index + 1, state.videoProgressions.length)
                ]
            }
            else if (index == -1) {
                if (state.videoProgressions.length < progressionsListLength) return {
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
                        ...state.videoProgressions.slice(0, progressionsListLength - 1)
                    ]
                }
            }
            else return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions.slice(0,index),
                    {
                        ...state.videoProgressions[index],
                        ...action.progressionObject,
                    },
                    ...state.videoProgressions.slice(index + 1, state.videoProgressions.length)
                ]
            }

        case actions.UPDATE_SOURCE_VIDEO:

            var index = state.videoProgressions.findIndex(item => item.videoID === action.videoObject.videoID)

            return {
                ...state,
                videoProgressions: [
                    ...state.videoProgressions.slice(0,index),
                    {
                        ...state.videoProgressions[index],
                        title: action.videoObject.title,
                    },
                    ...state.videoProgressions.slice(index + 1, state.videoProgressions.length)
                ]
            }

        default:
            return state
    }
}
