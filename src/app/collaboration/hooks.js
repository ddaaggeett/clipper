const { useEffect, useState } = require('react')
const { serverIP, socketPort } = require('../../../config')
const { useDispatch, useSelector } = require('react-redux')
const actions = require('./redux/actions/actionCreators')
const { io } = require('socket.io-client')
const socket = io(`http://${serverIP}:${socketPort.podware}`)

export const useGroupSession = (roomID) => {

    const redux = useDispatch()
    const { user } = useSelector(state => state.account)
    const [newAvailableRoom, setNewAvailableRoom] = useState(null)

    useEffect(() => {
        socket.on('broadcast_rooms_available', (rooms, callback) => {
            redux(actions.updateAvailableRooms(rooms))
            callback()
        })
    }, [])

    useEffect(() => {
        if (newAvailableRoom) {
            const packet = {
                room: newAvailableRoom,
                user,
            }
            socket.emit('new_available_room', packet, room => {
                redux(actions.updateRoom(room))
            })
        }
    }, [newAvailableRoom])

    return { setNewAvailableRoom }
}
