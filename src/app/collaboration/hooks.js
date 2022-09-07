const { useEffect, useState } = require('react')
const { serverIP, socketPort } = require('../../../config')
const { useSelector } = require('react-redux')
const { io } = require('socket.io-client')
const socket = io(`http://${serverIP}:${socketPort.podware}`)

export const initCollaboration = () => {

    const { user } = useSelector(state => state.account)
    const { room } = useSelector(state => state.collaboration)

    useEffect(() => {
        if (room) {
            const packet = {
                room,
                user,
            }
            // socket.emit('broadcast_room_available', packet)
        }
    }, [room])

    const sendMessage = (text) => {
        const packet = {
            room,
            message: text,
        }
        // socket.to('send_message', (packet, message) => {
        //     console.log(`incoming message: ${message}`)
        //     setMessages(messages.push(message))
        // })
    }


    return {
        sendMessage,
    }

}
