import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking';

export default () => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)

    const downloadClip = () => {
        if (Platform.OS === 'web') Linking.openURL(clips[editIndex].id)
    }

    if (clips[editIndex].serverUri == undefined) return null
    else return (
        <TouchableOpacity style={[styles.controlButton, styles.downloadClip]} onPress={() => downloadClip()}>
            <Text style={styles.controlButtonText}>{'DOWNLOAD CLIP'}</Text>
        </TouchableOpacity>
    )
}
