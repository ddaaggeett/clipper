import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../config'
import { useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const redux = useDispatch()

    useEffect(() => {
        socket.on('updateClip', clip => redux(actions.updateClip(clip)))
        socket.on('deleteClip', clip => redux(actions.deleteClip(clip)))
    }, [])
}
