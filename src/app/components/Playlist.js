import React, {
    useEffect,
    useState,
} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { styles } from '../styles'
import { useSelector } from 'react-redux'
import {
    serverIP,
    port,
} from '../../../config'
import * as AuthSession from 'expo-app-auth'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const loggedIn = useSelector(state => state.account.loggedIn)
    const user = useSelector(state => state.account.user)
    const accessToken = useSelector(state => state.account.accessToken)
    const idToken = useSelector(state => state.account.idToken)
    const refreshToken = useSelector(state => state.account.refreshToken)

    const [playlist, setPlaylist] = useState(null)

    const auth = {
        accessToken,
        refreshToken,
    }

    const triggerPlaylist = async () => {
        socket.emit('getPlaylist', auth, receivedPlaylist => {
            console.log(receivedPlaylist)
            setPlaylist(receivedPlaylist)
        })
    }


    return (
        <View>
            <TouchableOpacity style={styles.controlButton} onPress={() => triggerPlaylist()}>
                <Text style={styles.controlButtonText}>get playlist</Text>
            </TouchableOpacity>
            <Text style={{color:'white'}}>{JSON.stringify(playlist, null, 4)}</Text>
        </View>
    )
}
