import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
import { useSocket } from './hooks'

export default () => {

    const redux = useDispatch()
    const appState = useSelector(state => state.whitesocket)
    const socket = useSocket()

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
