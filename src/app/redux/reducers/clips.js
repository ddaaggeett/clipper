import * as actions from '../actions'

const initialState = []

export default function clips(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_CLIPS:
            return action.clips

        case actions.ADD_CLIP:
            return [
                ...state,
                action.clip
            ]

        case actions.UPDATE_CLIP:
            return [
                ...state.slice(0, action.index),
                action.clip,
                ...state.slice(action.index + 1, state.length)
            ]

        default:
            return state
    }
}
