import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serverIP } from '../../../config'
import * as actions from './redux/actions/actionCreators'
import { io } from 'socket.io-client'
const functions = require('../../server/functions')

const clipper = functions.getAppObject('clipper')
const socket = io(`http://${serverIP}:${clipper.socketPort}`)

export default () => {

    const redux = useDispatch()
    const { user } = useSelector(state => state.account)
    const { pending } = useSelector(state => state.clips)

    useEffect(() => {

        socket.on('updateClip', clip => redux(actions.updateClip(clip)))
        socket.on('deleteClip', clip => redux(actions.deleteClip(clip)))
        socket.on('updateSourceVideo', videoObject => redux(actions.updateSourceVideo(videoObject)))
        socket.on('videoProgressions', progressions => redux(actions.updateProgressions(progressions)))

        if (user) {
            const packet = {
                user,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        }

        return () => {
            // TODO: hook cleanup all current user state
            redux(actions.updateClips([]))
        }
    }, [])
}

export const useSocket = () => {
    return socket
}
