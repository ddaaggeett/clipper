import { combineReducers } from 'redux'
import clips from './clips'
import player from './player'
import account from './account'
import library from './library'

export default combineReducers({
    clips,
    player,
    account,
    library,
})
