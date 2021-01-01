import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"

export default (props) => {
    return (
        <View>
            <Text style={styles.controlButtonText} >{"Manage Clips"}</Text>
        </View>
    )
}
