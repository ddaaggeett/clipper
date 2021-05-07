import { View, Text, TouchableOpacity, TextInput, Platform, Keyboard } from "react-native"
import React, { useEffect } from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import getContentID from '../getContentID'

export default (props) => {

    const { contentID, panelWidth } = useSelector(state => state.app)
    const { playlist, selectingFromPlaylist, selectingUnfinishedVideo } = useSelector(state => state.library)
    const redux = useDispatch()

    const handleGetPlayContent = (text) => {
        redux(actions.setEditIndex(null))
        redux(actions.updateContentID(getContentID(text)))
    }

    useEffect(() => Keyboard.dismiss(), [contentID])

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
