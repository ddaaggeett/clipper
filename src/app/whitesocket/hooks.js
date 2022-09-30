import { serverIP } from '../../../config'
import { io } from 'socket.io-client'
const functions = require('../../server/functions')

const whitesocket = functions.getAppObject('whitesocket')
const socket = io(`http://${serverIP}:${whitesocket.socketPort}`)

export const useSocket = () => {
    return socket
}
