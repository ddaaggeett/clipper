import { combineReducers } from 'redux'
import clips from '../../../clipper/redux/reducers/clips'
import library from '../../../clipper/redux/reducers/library'
import clipper from '../../../clipper/redux/reducers/app'
import whitesocket from '../../../whitesocket/redux/reducers/app'
import collaboration from '../../../collaboration/redux/reducers/app'
import podware from '../../../podware/redux/reducers/app'
import account from './app'

export default combineReducers({
    clips,
    library,
    clipper,
    whitesocket,
    collaboration,
    podware,
    account,
})
