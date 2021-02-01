import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import React, {
    useEffect,
} from 'react'
import {
    View,
    Text,
} from 'react-native'
import { styles } from '../styles'
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import { updateClips } from '../redux/actions/actionCreators'
import {
    serverIP,
    port,
} from '../../../config'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const clips = useSelector(state => state.clips)
    const redux = useDispatch()

    useEffect(() => {
        socket.emit('allClips', clips, clipsFromServer => {
            redux(updateClips(clipsFromServer))
        })
    },[]) // run only once on startup

    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>CLIPPER Web App</Text>
            <VideoSelector />
            <Clipper />
        </View>
    )
}
