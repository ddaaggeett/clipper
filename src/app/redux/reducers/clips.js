import * as actions from '../actions'

const initialState = []

export default function clips(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_CLIPS:
            return action.clips

        default:
            return state
    }
}
