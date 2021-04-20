import React from 'react'
import { View, Text, Image, Platform } from 'react-native'
import { styles } from '../styles'
import { serverIP, expressPort } from '../../../config'

export default (props) => {

    var thumbnailURI
    if (props.clip.thumbnails === undefined) thumbnailURI = `http://${serverIP}:${expressPort}/${props.clip.videoId}/${props.clip.videoId}.png`
    else {
        const dirArray = props.clip.thumbnails[0].split('/')
        const thumbnailFile = dirArray[dirArray.length - 1]
        thumbnailURI = `http://${serverIP}:${expressPort}/${props.clip.videoId}/${props.clip.id}/${thumbnailFile}`
    }

    if (Platform.OS === 'web') return (
        <View>
            <ClipTime clip={props.clip} />
            <Image source={{ uri: thumbnailURI }} style={styles.thumbnailWeb} />
        </View>
    )
    else return (
        <View>
            <ClipTime clip={props.clip} />
            <Image source={{ uri: thumbnailURI }} style={styles.thumbnail} />
        </View>
    )
}

const ClipTime = (props) => {

    return (
        <View style={styles.clipDuration}>
            <Text style={styles.clipDurationText}>{new Date(props.clip.duration * 1000).toISOString().substr(14, 5)}</Text>
        </View>
    )
}
