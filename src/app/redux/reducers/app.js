import * as actions from '../actions'

const initialState = {
    leftCursor: 0,
    rightCursor: 0,
    handlingLeft: false,
    handlingRight: false,
    leftClipped: false,
    rightClipped: false,
    boundCount: 0,
    editIndex: null,
    speed: 1,
    contentID: '',
    panelWidth: 0,
    gotSomethingCursor: null,
    videoSelectorFocused: false,
    playingClip: false,
}

export default function app(state = initialState, action) {
    switch(action.type) {

        case actions.SET_LEFT_CURSOR:
            return {
                ...state,
                leftCursor: action.cursor,
            }

        case actions.SET_RIGHT_CURSOR:
            return {
                ...state,
                rightCursor: action.cursor,
            }

        case actions.SET_HANDLING_LEFT:
            return {
                ...state,
                handlingLeft: action.handling,
            }

        case actions.SET_HANDLING_RIGHT:
            return {
                ...state,
                handlingRight: action.handling,
            }

        case actions.SET_LEFT_CLIPPED:
            return {
                ...state,
                leftClipped: action.clipped,
            }

        case actions.SET_RIGHT_CLIPPED:
            return {
                ...state,
                rightClipped: action.clipped,
            }

        case actions.SET_BOUND_COUNT:
            return {
                ...state,
                boundCount: action.count,
            }

        case actions.SET_EDIT_INDEX:
            if (action.index == null) return {
                ...state,
                editIndex: action.index,
                playingClip: false,
            }
            else return {
                ...state,
                editIndex: action.index,
            }

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

        case actions.SET_WEB_PANEL_WIDTH:
            return {
                ...state,
                panelWidth: action.width,
            }

        case actions.SET_GOT_SOMETHING_CURSOR:
            return {
                ...state,
                gotSomethingCursor: action.cursor,
            }

        case actions.SET_VIDEO_SELECTOR_FOCUSED:
            return {
                ...state,
                videoSelectorFocused: action.focused,
            }

        case actions.SET_PLAYING_CLIP:
            if(action.playing == true) return {
                ...state,
                playingClip: action.playing,
                contentID: action.contentID,
            }
            else return {
                ...state,
                playingClip: action.playing
            }

        case actions.SET_CONFIRM_DELETE:
            return {
                ...state,
                confirmDelete: action.confirm,
            }

        default:
            return state
    }
}
