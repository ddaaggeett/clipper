import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"

export default ({clip}) => (
    <View style={styles.clipItem}>
        <Text style={styles.clipItemText}>{clip.id}</Text>
    </View>
)
