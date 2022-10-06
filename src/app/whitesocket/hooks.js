import { useSelector, useDispatch } from 'react-redux'
import { serverIP } from '../../../config'
import { io } from 'socket.io-client'
const functions = require('../../server/functions')
import * as actions from './redux/actions/actionCreators'

const whitesocket = functions.getAppObject('whitesocket')
const socket = io(`http://${serverIP}:${whitesocket.socketPort}`)

export default () => {

    const redux = useDispatch()
    const appState = useSelector(state => state.whitesocket)

    useEffect(() => {
        socket.emit('syncUserState', appState)
        socket.on('updateCurrent', current => redux(actions.updateCurrent(current)))
        socket.on('prepCapture', () => redux(actions.prepCapture(true)))
    }, [])

    useEffect(() => {
        socket.emit('syncUserState', appState)
    }, [appState.diff, appState.outputShape])

    useEffect(() => {
        if(appState.prepping) {
            socket.emit('capturePrepped')
            redux(actions.prepCapture(false))
        }
    }, [appState.prepping])
}


export const useSocket = () => {
    return socket
}
