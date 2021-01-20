import * as actions from '../actions'

const initialState = {
    library: {
        videos: [],
        playlists: [],
    },
    speed: 1,
    contentID: '',
}

export default function player(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_SPEED:
            return {
                ...state,
                speed: action.speed,
            }

        case actions.UPDATE_CONTENT_ID:
            return {
                ...state,
                contentID: action.contentID,
            }

        default:
            return state
    }
}
