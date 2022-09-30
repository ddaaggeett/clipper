import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
import { useSocket } from './hooks'

export default () => {

    const redux = useDispatch()
    const socket = useSocket()

    useEffect(() => {
        socket.on('updateClip', clip => redux(actions.updateClip(clip)))
        socket.on('deleteClip', clip => redux(actions.deleteClip(clip)))
        socket.on('updateSourceVideo', videoObject => redux(actions.updateSourceVideo(videoObject)))
        socket.on('videoProgressions', progressions => redux(actions.updateProgressions(progressions)))
    }, [])
}
