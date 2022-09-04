const { useEffect } = require('react')
const { serverIP, socketPort } = require('../../../config')
const { io } = require('socket.io-client')
const socket = io(`http://${serverIP}:${socketPort.podware}`)

export const initPodware = () => {
    useEffect(() => {
    }, [])
}
