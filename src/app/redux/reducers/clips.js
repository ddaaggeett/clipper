import * as actions from '../actions'

const initialState = {
    clips: [],
    pending: [],
}

export default function clips(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_CLIPS:
            return {
                ...state,
                clips: [...action.clips],
            }

        case actions.ADD_CLIP:
            return {
                ...state,
                clips: [
                    ...state.clips,
                    action.clip
                ]
            }

        case actions.UPDATE_CLIP:
            return {
                ...state,
                clips: [
                    ...state.clips.slice(0, action.index),
                    action.clip,
                    ...state.clips.slice(action.index + 1, state.clips.length)
                ]
            }

        default:
            return state
    }
}
