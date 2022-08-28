import * as actions from '.'

export const updateWebApp = (app) => {
    return {
        type: actions.UPDATE_WEB_APP,
        app,
    }
}

export const updateDomain = (domain) => {
    return {
        type: actions.UPDATE_DOMAIN,
        domain,
    }
}

export function login(account) {
    return {
        type: actions.LOGIN,
        account,
    }
}

export function logout() {
    return {
        type: actions.LOGOUT
    }
}

export function updateUser(user) {
    return {
        type: actions.UPDATE_USER,
        user,
    }
}
