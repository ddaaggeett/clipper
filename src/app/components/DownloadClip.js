import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import { serverIP, expressPort } from '../../../config'

export default () => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)

    const downloadClip = () => {
        if (Platform.OS === 'web') Linking.openURL(`http://${serverIP}:${expressPort}/${clips[editIndex].id}`)
    }

    if (clips[editIndex].clipUri == undefined) return null
    else return (
        <TouchableOpacity style={[styles.controlButton, styles.downloadClip]} onPress={() => downloadClip()}>
        {
            clips[editIndex].thumbnail_white_uri !== undefined || clips[editIndex].thumbnail_black_uri !== undefined
            ?   <Text style={styles.controlButtonText}>{'DOWNLOAD CLIP + THUMBNAIL'}</Text>
            :   <Text style={styles.controlButtonText}>{'DOWNLOAD CLIP'}</Text>
        }
        </TouchableOpacity>
    )
}
