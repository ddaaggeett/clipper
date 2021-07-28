/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
import { View, Text, TouchableOpacity, TextInput, Platform, Keyboard } from "react-native"
import React, { useEffect } from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import getContentID from '../getContentID'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../config'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const { contentID, panelWidth } = useSelector(state => state.app)
    const redux = useDispatch()

    const handleGetPlayContent = (text) => {
        redux(actions.setEditIndex(null))
        redux(actions.updateContentID(getContentID(text)))
    }

    useEffect(() => {
        Keyboard.dismiss()

        if (contentID !== '') {
            socket.emit('updateSourceVideo', {
                id: contentID,
                videoID: contentID,
            }, videoObject => {
                // TODO: videoObject.title now exists
            })
        }
    }, [contentID])

    const focusVideoSelector = () => redux(actions.setVideoSelectorFocused(true))
    const blurVideoSelector = () => redux(actions.setVideoSelectorFocused(false))

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
        <TextInput
            style={styles.urlText}
            onChangeText={text => handleGetPlayContent(text)}
            value={contentID}
            placeholder={"paste YouTube address"}
            placeholderTextColor={"white"}
            onFocus={focusVideoSelector}
            onBlur={blurVideoSelector}
            />
    )

}
