import { io } from 'socket.io-client'
import { serverIP, port } from '../../config'
const socket = io('http://'+ serverIP + ':' + port)

export default () => {
    return new  Promise((resolve, reject) => {
        socket.on('updateClip', clip => resolve({
            type: 'updateClip',
            clip,
        }))
        socket.on('deleteClip', clip => resolve({
            type: 'deleteClip',
            clip,
        }))
    })
}
