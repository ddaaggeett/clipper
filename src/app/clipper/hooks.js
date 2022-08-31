import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serverIP, socketPort } from '../../../config'
import { io } from 'socket.io-client'

const socket = io(`http://${serverIP}:${socketPort.clipper}`)

export const useInitUserSession = () => {

    const redux = useDispatch()
    const { loggedIn, user } = useSelector(state => state.account)
    const { pending } = useSelector(state => state.clips)

    useEffect(() => {
        if (loggedIn && user !== null) {
            const packet = {
                userID: user.id,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        }
    }, [])

}
