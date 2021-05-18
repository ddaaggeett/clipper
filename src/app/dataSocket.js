import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../config'
import { useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
const socket = io('http://'+ serverIP + ':' + socketPort)

export default () => {

    const redux = useDispatch()

    useEffect(() => {
        socket.on('updateClip', clip => redux(actions.updateClip(clip)))
        socket.on('deleteClip', clip => redux(actions.deleteClip(clip)))
        socket.on('updateSourceVideo', videoObject => redux(actions.updateSourceVideo(videoObject)))
    }, [])
}
