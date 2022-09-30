import { serverIP } from '../../../config'
import { io } from 'socket.io-client'
const functions = require('../../server/functions')

const account = functions.getAppObject('account')
const socket = io(`http://${serverIP}:${account.socketPort}`)

export const useSocket = () => {
    return socket
}
