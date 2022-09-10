const { useEffect, useState } = require('react')
const { serverIP, socketPort } = require('../../../config')
const { useDispatch, useSelector } = require('react-redux')
const actions = require('./redux/actions/actionCreators')
const { io } = require('socket.io-client')
const socket = io(`http://${serverIP}:${socketPort.podware}`)

export const useGroupSession = () => {

    const redux = useDispatch()

    useEffect(() => {
        socket.on('broadcast_rooms_available', (rooms, callback) => {
            redux(actions.updateAvailableRooms(rooms))
            callback()
        })
    }, [])

}

export const joinRoom = () => {

    const redux = useDispatch()
    const { user } = useSelector(state => state.account)
    const [selectedRoom, setSelectedRoom] = useState(null)

    useEffect(() => {

        let packet = {}

        if (selectedRoom === 'new') {
            packet = {
                room: {
                    id: Date.now(),
                    users: [user]
                },
                user,
            }
        }
        else if (selectedRoom) {
            packet = {
                room: {
                    ...selectedRoom,
                    users: [...selectedRoom.users, user]
                },
                user,
            }
        }

        socket.emit('join_room', packet, room => {
            redux(actions.updateRoom(room))
        })

        return () => setSelectedRoom(null)

    }, [selectedRoom])

    return { setSelectedRoom }

}
