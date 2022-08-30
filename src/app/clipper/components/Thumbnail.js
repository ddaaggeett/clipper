import React from 'react'
import { View, Text, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native'
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

const styles = StyleSheet.create({
    thumbnail: {
        width: 160,
        height: 90
    },
    thumbnailWeb: {
        width: 200,
        height: 113
    },
    clipDuration: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        zIndex: 1,
        padding: 3,
        paddingLeft: 4,
        paddingBottom: 2,
        color:'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
