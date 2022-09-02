import * as actions from '.'

export const updateCurrent = current => {
    return {
        type: actions.UPDATE_CURRENT,
        current
    }
}

export const prepCapture = prepping => {
    return {
        type: actions.PREP_CAPTURE,
        prepping
    }
}

export const updateOutputShape = shape => {
    return {
        type: actions.UPDATE_OUTPUT_SHAPE,
        shape
    }
}

export const updateAppOpened = opened => {
    return {
        type: actions.UPDATE_APP_OPENED,
        opened
    }
}
