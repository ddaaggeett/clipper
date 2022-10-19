import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import { serverIP, expressPort } from '../../../../config'
import { useSocket } from '../hooks'
import * as actions from '../redux/actions/actionCreators'

export default () => {

    const { editIndex } = useSelector(state => state.clipper)
    const { clips } = useSelector(state => state.clips)
    const socket = useSocket()
    const redux = useDispatch()

    const downloadClip = () => {
        Linking.openURL(`http://${serverIP}:${expressPort}/${clips[editIndex].id}`)
    }

    const reClip = () => socket.emit('reClip', clips[editIndex], clip => {
        redux(actions.updateClip(clip))
    })

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

const styles = StyleSheet.create({
    controlButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor:'black',
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    downloadClip: {
        backgroundColor: 'green',
    },
})
