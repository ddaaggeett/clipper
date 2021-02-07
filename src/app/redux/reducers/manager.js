import * as actions from '../actions'

const initialState = {
    editIndex: null,
}

export default function manager(state = initialState, action) {
    switch(action.type) {

        case actions.SET_EDIT_INDEX:
            return {
                ...state,
                editIndex: action.index,
            }

        default:
            return state
    }
}
