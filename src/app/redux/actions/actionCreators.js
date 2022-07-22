import * as actions from '.'

export function updateWebApp(app) {
    return {
        type: actions.UPDATE_WEB_APP,
        app,
    }
}
