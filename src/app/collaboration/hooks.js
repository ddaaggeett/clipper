const { useEffect, useState } = require('react')
const { serverIP, socketPort } = require('../../../config')
const { useDispatch, useSelector } = require('react-redux')
const actions = require('./redux/actions/actionCreators')
const { io } = require('socket.io-client')
const socket = io(`http://${serverIP}:${socketPort.podware}`)

export const useGroupSession = () => {

    const redux = useDispatch()

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
            socket.emit('join_room', packet, ({updatedRooms, updatedRoom}) => {
                redux(actions.updateAvailableRooms(updatedRooms))
                redux(actions.updateRoom(updatedRoom))
            })
        }
        return () => setSelectedRoom(null)
    }, [selectedRoom])

    return { setSelectedRoom }

}

export const sendMessage = (message) => {
    socket.emit('message', message)
}
