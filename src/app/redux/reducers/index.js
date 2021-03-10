import { combineReducers } from 'redux'
import clips from './clips'
import account from './account'
import library from './library'
import app from './app'

export default combineReducers({
    clips,
    account,
    library,
    app,
})
