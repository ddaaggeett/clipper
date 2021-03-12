import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import { styles } from '../styles'
import { styles as webStyles } from '../web/styles'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    const handlePlayClip = () => redux(actions.setPlayingClip(true, clips[editIndex].videoId))

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity
                style={[styles.controlButton, {backgroundColor: 'black'}]}
                onPress={() => props.handleEditClip()}
                >
                <Text style={styles.controlButtonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.controlButton, {backgroundColor: 'green'}]}
                onPress={() => handlePlayClip()}
                >
                <Text style={styles.controlButtonText}>PLAY</Text>
            </TouchableOpacity>
        </View>
    )
}
