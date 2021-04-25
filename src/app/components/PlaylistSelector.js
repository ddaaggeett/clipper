import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { serverIP, socketPort } from '../../../config'
import * as AuthSession from 'expo-app-auth'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + socketPort)
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const user = useSelector(state => state.account.user)
    const accessToken = useSelector(state => state.account.accessToken)
    const playlists = useSelector(state => state.library.playlists)
    const playlist = useSelector(state => state.library.playlist)

    const getPlaylists = () => {
        socket.emit('getAllPlaylists', accessToken, data => {
            redux(actions.setPlaylists(data))
        })
    }

    const handleSelectPlaylist = () => {
        getPlaylists()
        props.navigation.navigate('PlaylistSelectorList')
    }

    return (
        <View>
        {
            playlist.id !== null
            ?   <View>
                    <TouchableOpacity style={styles.controlButton} onPress={() => handleSelectPlaylist()}>
                        <Text style={styles.controlButtonText}>{`playlist: ${playlist.title}`}</Text>
                    </TouchableOpacity>
                </View>
            :   <View>
                    <TouchableOpacity style={styles.controlButton} onPress={() => handleSelectPlaylist()}>
                        <Text style={styles.controlButtonText}>{`${user.name}'s playlists`}</Text>
                    </TouchableOpacity>
                </View>
        }
        </View>
    )
}
