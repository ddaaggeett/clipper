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

        default:
            return state
    }
}
