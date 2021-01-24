import * as actions from '../actions'

const initialState = {
    selectingFromPlaylist: false,
}

export default function library(state = initialState, action) {
    switch(action.type) {

        case actions.SELECTING_FROM_PLAYLIST:
            return {
                ...state,
                selectingFromPlaylist: action.isSelecting,
            }

        default:
            return state
    }
}
