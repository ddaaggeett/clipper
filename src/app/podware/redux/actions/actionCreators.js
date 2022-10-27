import * as actions from '.'

export const setUri = (uri) => {
    return {
        type: actions.SET_URI,
        uri,
    }
}
