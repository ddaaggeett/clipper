/*
license MIT
copyright Dave Daggett @ ddaaggeett.xyz
date 2021
*/
import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import { serverIP, socketPort, expressPort } from '../../../config'
import { io } from 'socket.io-client'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default () => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)

    const downloadClip = () => {
        if (Platform.OS === 'web') Linking.openURL(`http://${serverIP}:${expressPort}/${clips[editIndex].id}`)
    }

    const reClip = () => socket.emit('reClip', clips[editIndex])

    if (clips[editIndex].clipUri == undefined) return (
        <TouchableOpacity style={[styles.controlButton, {backgroundColor: 'orange'}]} onPress={() => reClip()}>
            <Text style={styles.controlButtonText}>{`Where's my download?`}</Text>
        </TouchableOpacity>
    )
    else return (
        <TouchableOpacity style={[styles.controlButton, styles.downloadClip]} onPress={() => downloadClip()}>
        {
            clips[editIndex].thumbnails !== undefined
            ?   <Text style={styles.controlButtonText}>{'DOWNLOAD CLIP + THUMBNAIL'}</Text>
            :   <Text style={styles.controlButtonText}>{'DOWNLOAD CLIP'}</Text>
        }
        </TouchableOpacity>
    )
}
