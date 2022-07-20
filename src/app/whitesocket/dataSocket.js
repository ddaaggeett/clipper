import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../config'
import { useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
const socket = io(`http://${serverIP}:${socketPort.whitesocket}`)

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
