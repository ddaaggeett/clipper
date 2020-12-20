import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "../styles"
import ClippingButtons from './ClippingButtons'
import PlaybackSpeed from './PlaybackSpeed'


export default (props) => {
    return (
        <View>
            <PlaybackSpeed {...props} />
            <ClippingButtons {...props} />
        </View>
    )
}
