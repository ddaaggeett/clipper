import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serverIP } from '../../../config'
import * as actions from './redux/actions/actionCreators'
import useDataSocketHook from './dataSocket'
import { io } from 'socket.io-client'
const functions = require('../../server/functions')

const clipper = functions.getAppObject('clipper')
const socket = io(`http://${serverIP}:${clipper.socketPort}`)

export const useInitUserSession = () => {

    useDataSocketHook()
    const redux = useDispatch()
    const { user } = useSelector(state => state.account)
    const { pending } = useSelector(state => state.clips)

    useEffect(() => {
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
