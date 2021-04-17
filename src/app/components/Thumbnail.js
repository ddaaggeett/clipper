import React from 'react'
import { Image, Platform } from 'react-native'
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

    if (Platform.OS === 'web') return <Image source={{ uri: thumbnailURI }} style={styles.thumbnailWeb} />
    else return <Image source={{ uri: thumbnailURI }} style={styles.thumbnail} />
}
