import * as actions from '../actions'

const initialState = {
    clips: [],
}

export default function clips(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_CLIPS:
            return {
                ...state,
                clips: action.clips
            }

        default:
            return state
    }
}
