import { View, Text, TouchableOpacity } from "react-native"
import React from 'react'
import { useSelector } from 'react-redux'
import ClippingButtons from './ClippingButtons'
import PlaybackSpeed from './PlaybackSpeed'

export default (props) => {

    const { videoSelectorFocused } = useSelector(state => state.clipper)

    if (videoSelectorFocused) return null
    else return (
        <View>
            <PlaybackSpeed />
            <ClippingButtons {...props} />
        </View>
    )
}
