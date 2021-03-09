import { combineReducers } from 'redux'
import clips from './clips'
import player from './player'
import account from './account'
import library from './library'
import manager from './manager'
import app from './app'

export default combineReducers({
    clips,
    player,
    account,
    library,
    manager,
    app,
})
