import { View, Text, TouchableOpacity, TextInput, Platform } from "react-native"
import React from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import Playlist from './Playlist'
import * as actions from '../redux/actions/actionCreators'
import getContentID from '../getContentID'

export default (props) => {

    const { contentID, width } = useSelector(state => state.player)
    const { playlist, selectingFromPlaylist } = useSelector(state => state.library)
    const redux = useDispatch()

    const handleGetPlayContent = (text) => {
        redux(actions.setEditIndex(null))
        redux(actions.updateContentID(getContentID(text)))
    }

    const selectFromPlaylist = () => {
        redux(actions.selectingFromPlaylist(true))
    }

    const cancelSelectFromPlaylist = () => {
        redux(actions.selectingFromPlaylist(false))
    }

    if (Platform.OS === 'web') return (
        <TextInput
            style={styles.urlText}
            onChangeText={text => handleGetPlayContent(text)}
            value={contentID}
            placeholder={"paste YouTube video address"}
            placeholderTextColor={"white"}
            />
    )
    else return (
        <View>
        {
            selectingFromPlaylist
            ?   <View>
                    <TouchableOpacity style={[styles.controlButton, {backgroundColor:'red'}]} onPress={() => cancelSelectFromPlaylist()}>
                        <Text style={styles.controlButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <Playlist />
                </View>
            :   <View>
                    <TextInput
                        style={styles.urlText}
                        onChangeText={text => handleGetPlayContent(text)}
                        value={contentID}
                        placeholder={"paste YouTube address"}
                        placeholderTextColor={"white"}
                        />
                    <TouchableOpacity style={styles.controlButton} onPress={() => selectFromPlaylist()}>
                        <Text style={styles.controlButtonText}>{`select from ${playlist.title}`}</Text>
                    </TouchableOpacity>
                </View>
        }
        </View>
    )
}
