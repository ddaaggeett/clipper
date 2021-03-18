import { View, Text, TouchableOpacity, TextInput, Platform, Keyboard } from "react-native"
import React, { useEffect } from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import Playlist from './Playlist'
import UnfinishedVideosList from './UnfinishedVideosList'
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

    const cancelSelectFromPlaylist = () => {
        redux(actions.selectingFromPlaylist(false))
        redux(actions.selectingUnfinishedVideo(false))
        blurVideoSelector()
    }

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
        <View>
        {
            selectingFromPlaylist || selectingUnfinishedVideo
            ?   <View>
                    <TouchableOpacity style={[styles.controlButton, {backgroundColor:'red'}]} onPress={() => cancelSelectFromPlaylist()}>
                        <Text style={styles.controlButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    {
                        selectingFromPlaylist
                        ?   <Playlist />
                        :   <UnfinishedVideosList />
                    }
                </View>
            :   <View>
                    <TextInput
                        style={styles.urlText}
                        onChangeText={text => handleGetPlayContent(text)}
                        value={contentID}
                        placeholder={"paste YouTube address"}
                        placeholderTextColor={"white"}
                        onFocus={focusVideoSelector}
                        onBlur={blurVideoSelector}
                        />
                    <View style={styles.contentRow}>
                        <PlaylistButton />
                        <UnfinishedVideosButton />
                    </View>
                </View>
        }
        </View>
    )

}

const UnfinishedVideosButton = () => {

    const redux = useDispatch()
    const { videoProgressions } = useSelector(state => state.library)
    const { videoSelectorFocused } = useSelector(state => state.app)

    const selectUnfinished = () => redux(actions.selectingUnfinishedVideo(true))

    if (videoSelectorFocused || videoProgressions.length == 0) return null
    else return (
        <TouchableOpacity style={styles.controlButton} onPress={() => selectUnfinished()}>
            <Text style={styles.controlButtonText}>{`unfinished videos`}</Text>
        </TouchableOpacity>
    )
}

const PlaylistButton = () => {

    const redux = useDispatch()
    const { videoSelectorFocused } = useSelector(state => state.app)
    const { playlist } = useSelector(state => state.library)

    const selectFromPlaylist = () => redux(actions.selectingFromPlaylist(true))

    if (videoSelectorFocused || playlist.id == null) return null
    else return (
        <TouchableOpacity style={styles.controlButton} onPress={() => selectFromPlaylist()}>
            <Text style={styles.controlButtonText}>{`select from ${playlist.title}`}</Text>
        </TouchableOpacity>
    )
}
