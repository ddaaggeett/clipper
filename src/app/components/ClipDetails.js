import { View, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import EditTitleWhoComment from './EditTitleWhoComment'
import DeleteClip from './DeleteClip'
import React, { useState, useEffect, useRef } from 'react'
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
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
            <EditTitleWhoComment />
            <Text style={{color:'white'}}>{JSON.stringify(clip, null, 4)}</Text>
            <DeleteClip
                saveAndExit={saveAndExit}
                />
        </ScrollView>
    )
}

const ClipPlayer = (props) => {

    const { speed } = useSelector(state => state.app)
    const player = useRef()
    const [playing, setPlaying] = useState(false)

    if (props.clip != undefined) return (
        <YoutubePlayer
            ref={player}
            play={playing}
            height={Dimensions.get('window').width * 9 / 16}
            width={Dimensions.get('window').width}
            videoId={props.clip.videoId}
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
