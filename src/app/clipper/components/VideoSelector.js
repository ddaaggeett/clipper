import { View, Text, TouchableOpacity, TextInput, Platform, Keyboard, StyleSheet } from "react-native"
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import getContentID from '../getContentID'
import { useSocket } from '../hooks'

export default (props) => {

    const { contentID, panelWidth } = useSelector(state => state.clipper)
    const redux = useDispatch()
    const socket = useSocket()

    const handleGetPlayContent = (text) => {
        redux(actions.setEditIndex(null))
        if (
            text.includes('youtube.com/watch?v=') ||
            text.includes('https://youtu.be/') ||
            text.includes('youtube.com/playlist?list=')
        ) {
            redux(actions.validateYoutubeID(true))
            redux(actions.updateContentID(getContentID(text)))
        }
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

const styles = StyleSheet.create({
    urlText: {
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
    },
})
