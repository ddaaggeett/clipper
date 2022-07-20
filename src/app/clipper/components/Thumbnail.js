import React from 'react'
import { View, Text, Image, Platform, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { serverIP, expressPort } from '../../../../config'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default (props) => {

    const { editIndex } = useSelector(state => state.clipper)
    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    var thumbnailURI
    if (props.clip.thumbnails === undefined) thumbnailURI = `https://img.youtube.com/vi/${props.clip.videoID}/0.jpg`
    else {
        const dirArray = props.clip.thumbnails[0].split('/')
        const thumbnailFile = dirArray[dirArray.length - 1]
        thumbnailURI = `http://${serverIP}:${expressPort}/${props.clip.videoID}/${props.clip.id}/${thumbnailFile}`
    }

    const handlePlayClip = () => {
        if (editIndex != null) redux(actions.setPlayingClip(true, clips[editIndex].videoID))
        else {
            redux(actions.setEditIndex(props.index))
            redux(actions.setPlayingClip(true, clips[props.index].videoID))
        }
    }

    if (Platform.OS === 'web') return (
        <TouchableOpacity
            onPress={() => handlePlayClip()}
            style={styles.thumbnailWeb}
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
