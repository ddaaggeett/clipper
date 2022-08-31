import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serverIP, socketPort } from '../../../config'
import * as actions from './redux/actions/actionCreators'
import useDataSocketHook from './dataSocket'
import { io } from 'socket.io-client'

const socket = io(`http://${serverIP}:${socketPort.clipper}`)

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
