import React, {
    useEffect,
    useState,
} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
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
import * as actions from '../redux/actions/actionCreators'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const accessToken = useSelector(state => state.account.accessToken)
    const playlist = useSelector(state => state.library.playlist)
    const redux = useDispatch()

    const info = {
        accessToken,
        playlist,
    }

    useEffect(() => {
        socket.emit('getPlaylist', info, data => {
            redux(actions.setPlaylist({videos: data}))
        })
    },[playlist])

    const selectVideo = (item) => {
        redux(actions.updateContentID(item.id))
        redux(actions.selectingFromPlaylist(false))
    }

    const renderItem = ({ item }) => (
        <View style={styles.clipItem}>
            <TouchableOpacity onPress={() => selectVideo(item)}>
                <View style={{flex:1}}>
                    <Text style={styles.clipItemText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <View>
            <FlatList
                data={playlist.videos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </View>
    )
}
