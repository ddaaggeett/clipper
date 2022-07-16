import { combineReducers } from 'redux'
import clips from '../clipper/redux/reducers/clips'
import account from '../clipper/redux/reducers/account'
import library from '../clipper/redux/reducers/library'
import app from '../clipper/redux/reducers/app'
import whitesocket from '../whitesocket/redux/reducers/app'

export default combineReducers({
    clips,
    account,
    library,
    app,
    whitesocket,
})
