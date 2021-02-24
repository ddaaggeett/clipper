import * as actions from '../actions'

const initialState = {
    speed: 1,
    contentID: '',
    width: 0,
    videoProgress: 0,
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
                videoProgress: 0,
            }

        case actions.SET_WEB_PANEL_WIDTH:
            return {
                ...state,
                width: action.width,
            }

        case actions.SET_VIDEO_PROGRESS:
            return {
                ...state,
                videoProgress: action.progress,
            }

        default:
            return state
    }
}
