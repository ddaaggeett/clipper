import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'

export default () => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)

    const downloadClip = () => {
        console.log('download clip to client')
    }

    if (clips[editIndex].serverUri == undefined) return null
    else return (
        <TouchableOpacity style={[styles.controlButton, styles.downloadClip]} onPress={() => downloadClip()}>
            <Text style={styles.controlButtonText}>{'DOWNLOAD CLIP'}</Text>
        </TouchableOpacity>
    )
}
