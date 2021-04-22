import React from 'react'
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { serverIP, expressPort } from '../../../config'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    var thumbnailURI
    if (props.clip.thumbnails === undefined) thumbnailURI = `http://${serverIP}:${expressPort}/${props.clip.videoId}/${props.clip.videoId}.png`
    else {
        const dirArray = props.clip.thumbnails[0].split('/')
        const thumbnailFile = dirArray[dirArray.length - 1]
        thumbnailURI = `http://${serverIP}:${expressPort}/${props.clip.videoId}/${props.clip.id}/${thumbnailFile}`
    }

    const handlePlayClip = () => redux(actions.setPlayingClip(true, clips[editIndex].videoId))

    if (Platform.OS === 'web') return (
        <TouchableOpacity
            onPress={() => handlePlayClip()}
            >
            <ClipTime clip={props.clip} />
            <Image source={{ uri: thumbnailURI }} style={styles.thumbnailWeb} />
        </TouchableOpacity>
    )
    else return (
        <View>
            <ClipTime clip={props.clip} />
            <Image source={{ uri: thumbnailURI }} style={styles.thumbnail} />
        </View>
    )
}

const ClipTime = ({ clip }) => <Text style={styles.clipDuration}>{new Date(clip.duration * 1000).toISOString().substr(14, 5)}</Text>
