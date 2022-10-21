const { useEffect, useState } = require('react')
const { serverIP } = require('../../../config')
const { useDispatch, useSelector } = require('react-redux')
const actions = require('./redux/actions/actionCreators')
const { io } = require('socket.io-client')
import functions from '../../server/functions'

const collaboration = functions.getAppObject('collaboration')
const socket = io(`http://${serverIP}:${collaboration.socketPort}`)

export const useGroupSession = () => {

    const redux = useDispatch()
    const { user } = useSelector(state => state.account)

    useEffect(() => {

        socket.emit('get_rooms_available', (rooms) => {
            redux(actions.updateAvailableRooms(rooms))
        })

        socket.on('broadcast_rooms_available', (rooms) => {
            redux(actions.updateAvailableRooms(rooms))
        })

        socket.on('update_room', updatedRoom => {
            redux(actions.updateRoom(updatedRoom))
        })

    }, [])

    useEffect(() => {
        redux(actions.updateRoom(null))
    }, [user])

}

export const joinRoom = () => {

    const redux = useDispatch()
    const { user } = useSelector(state => state.account)
    const [selectedRoom, setSelectedRoom] = useState(null)

    useEffect(() => {
        let packet = {}
        if (selectedRoom) {
            if (selectedRoom === 'new') {
                packet = {
                    room: {
                        id: Date.now(),
                        users: [],
                        messages: [],
                    },
                    user,
                }
            }
            else {
                packet = {
                    room: selectedRoom,
                    user,
                }
            }
            socket.emit('join_room', packet)
        }
        return () => setSelectedRoom(null)
    }, [selectedRoom])

    return { setSelectedRoom }

}

export const sendMessage = (message) => {
    socket.emit('message', message)
}

export const useSocket = () => {
    return socket
}
