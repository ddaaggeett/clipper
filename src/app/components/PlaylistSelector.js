import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { styles } from '../styles'
import {
    useSelector,
    useDispatch,
 } from 'react-redux'
import {
    serverIP,
    port,
} from '../../../config'
import * as AuthSession from 'expo-app-auth'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const accessToken = useSelector(state => state.account.accessToken)
    const playlists = useSelector(state => state.account.playlists)

    const getPlaylists = () => {
        socket.emit('getAllPlaylists', accessToken, data => {
            redux(actions.setPlaylists(data))
        })
    }

    return (
        <View style={{marginTop:25}}>
            <TouchableOpacity style={styles.controlButton} onPress={() => getPlaylists()}>
                <Text style={styles.controlButtonText}>select playlist</Text>
            </TouchableOpacity>
            <Text style={{color:'white'}}>{JSON.stringify(playlists, null, 4)}</Text>
        </View>
    )
}
