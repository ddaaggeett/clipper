import * as actions from '../actions'

const initialState = {
    clips: [],
    pending: [],
}

let clipsIndex, pendingIndex

export default function clips(state = initialState, action) {
    switch(action.type) {

        case actions.UPDATE_CLIPS:
            return {
                ...state,
                clips: [...action.clips],
            }

        case actions.UPDATE_CLIP:

            clipsIndex = state.clips.findIndex(item => item.timestamp === action.clip.timestamp)

            if (clipsIndex == -1)  return {
                ...state,
                clips: [
                    ...state.clips,
                    action.clip
                ]
            }
            else return {
                ...state,
                clips: [
                    ...state.clips.slice(0, clipsIndex),
                    action.clip,
                    ...state.clips.slice(clipsIndex + 1, state.clips.length)
                ]
            }

        case actions.ADD_PENDING_CLIP:
            return {
                ...state,
                pending: [
                    ...state.pending,
                    action.clip,
                ],
                clips: [
                    ...state.clips,
                    action.clip,
                ],
            }

        case actions.UPDATE_PENDING_CLIP:

            clipsIndex = state.clips.findIndex(item => item.timestamp === action.clip.timestamp)
            pendingIndex = state.pending.findIndex(item => item.timestamp === action.clip.timestamp)

            if (pendingIndex == -1) return {
                ...state,
                clips: [
                    ...state.clips.slice(0, clipsIndex),
                    action.clip,
                    ...state.clips.slice(clipsIndex + 1, state.clips.length)
                ],
                pending: [
                    ...state.pending,
                    action.clip,
                ],
            }
            else return {
                ...state,
                clips: [
                    ...state.clips.slice(0, clipsIndex),
                    action.clip,
                    ...state.clips.slice(clipsIndex + 1, state.clips.length)
                ],
                pending: [
                    ...state.pending.slice(0, pendingIndex),
                    action.clip,
                    ...state.pending.slice(pendingIndex + 1, state.pending.length)
                ],
            }

        case actions.FULFILL_PENDING_CLIP:

            clipsIndex = state.clips.findIndex(item => item.timestamp === action.clip.timestamp)
            pendingIndex = state.pending.findIndex(item => item.timestamp === action.clip.timestamp)

            return {
                ...state,
                clips: [
                    ...state.clips.slice(0, clipsIndex),
                    action.clip,
                    ...state.clips.slice(clipsIndex + 1, state.clips.length),
                ],
                pending: [
                    ...state.pending.slice(0, pendingIndex),
                    ...state.pending.slice(pendingIndex + 1, state.pending.length),
                ],
            }

        case actions.CLEAR_PENDING:
            return {
                ...state,
                pending:[],
            }

        default:
            return state
    }
}
