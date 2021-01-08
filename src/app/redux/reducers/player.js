import * as actions from '../actions'

const initialState = {
    speed: 1,
}

export default function player(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_PLAYER:
            return {
                ...state,
                speed: action.player.speed,
            }

        default:
            return state
    }
}
