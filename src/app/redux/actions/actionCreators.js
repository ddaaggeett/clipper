import * as actions from '.'

export const updateWebApp = (app) => {
    return {
        type: actions.UPDATE_WEB_APP,
        app,
    }
}
