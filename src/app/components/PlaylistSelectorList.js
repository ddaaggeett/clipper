import React from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from '../styles'
import * as actions from '../redux/actions/actionCreators'
import { serverIP, socketPort } from '../../../config'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const accessToken = useSelector(state => state.account.accessToken)
    const playlists = useSelector(state => state.library.playlists)
    const redux = useDispatch()

    const selectPlaylist = (playlist) => {
        const info = {
            accessToken,
            playlist,
        }
        socket.emit('getPlaylist', info, data => {
            redux(actions.setPlaylist({
                ...playlist,
                videos: data,
            }))
        })
        props.navigation.goBack()
    }

    const renderItem = ({ item }) => (
        <View style={styles.clipItem}>
            <TouchableOpacity onPress={() => selectPlaylist({id: item.id, title: item.title})}>
                <View style={{flex:1}}>
                    <Text style={styles.clipItemText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={playlists}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </View>
    )
}
