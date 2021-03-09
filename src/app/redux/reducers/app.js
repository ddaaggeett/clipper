import * as actions from '../actions'

const initialState = {
    leftCursor: 0,
    rightCursor: 0,
    handlingLeft: false,
    handlingRight: false,
    leftClipped: false,
    rightClipped: false,
    boundCount: 0,
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

        default:
            return state
    }
}
