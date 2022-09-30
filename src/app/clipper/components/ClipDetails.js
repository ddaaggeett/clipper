import { View, Text, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from "react-native"
import EditClipInfo from './EditClipInfo'
import DeleteClip from './DeleteClip'
import React, { useState, useEffect, useRef } from 'react'
import YoutubePlayer from "react-native-youtube-iframe"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const { editIndex, confirmDelete } = useSelector(state => state.clipper)
    const { clips } = useSelector(state => state.clips)
    const clip = clips[editIndex]
    const redux = useDispatch()

    useEffect(() => {
        return () => redux(actions.setEditIndex(null))
    }, [])

    const saveAndExit = () => {
        props.navigation.goBack()
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.controlButton} onPress={() => saveAndExit()}>
                <Text style={styles.controlButtonText}>{'<-- SAVE CLIP'}</Text>
            </TouchableOpacity>
            <ClipPlayer
                clip={clip}
                />
            <EditClipInfo />
            <DeleteClip
                saveAndExit={saveAndExit}
                />
        </ScrollView>
    )
}

const ClipPlayer = (props) => {

    const { speed } = useSelector(state => state.clipper)
    const player = useRef()
    const [playing, setPlaying] = useState(false)

    if (props.clip != undefined) return (
        <YoutubePlayer
            ref={player}
            play={playing}
            height={Dimensions.get('window').width * 9 / 16}
            width={Dimensions.get('window').width}
            videoId={props.clip.videoID}
            playbackRate={speed}
            initialPlayerParams={{
                // TODO: use exact values instead of integers
                start: Math.floor(props.clip.start),
                end: Math.ceil(props.clip.end),
            }}
            />
    )
    else return null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    controlButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor:'black',
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
})
