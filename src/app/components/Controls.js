/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
import { View, Text, TouchableOpacity } from "react-native"
import React from 'react'
import { useSelector } from 'react-redux'
import { styles } from "../styles"
import ClippingButtons from './ClippingButtons'
import PlaybackSpeed from './PlaybackSpeed'

export default (props) => {

    const { videoSelectorFocused } = useSelector(state => state.app)

    if (videoSelectorFocused) return null
    else return (
        <View>
            <PlaybackSpeed />
            <ClippingButtons {...props} />
        </View>
    )
}
