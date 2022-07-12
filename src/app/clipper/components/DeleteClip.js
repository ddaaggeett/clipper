import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../../config'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const { editIndex, panelWidth, confirmDelete } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)
    const clip = clips[editIndex]
    const redux = useDispatch()

    const deleteClip = () => {
        redux(actions.setEditIndex(null))
        redux(actions.setConfirmDelete(false))
        if(Platform.OS !== 'web') props.saveAndExit()
        redux(actions.pendingDeleteClip({ ...clip, deleted: true }))
        socket.volatile.emit('deleteClip', clip, returnedClip => {
            redux(actions.fulfillPendingDelete(returnedClip))
        })
    }

    return (
        confirmDelete
        ?   <View style={styles.contentRow}>
                <TouchableOpacity style={[styles.controlButton, styles.deleteClip]} onPress={() => deleteClip()}>
                    <Text style={styles.controlButtonText}>{'CONFIRM DELETE'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor:'orange'}]} onPress={() => redux(actions.setConfirmDelete(false))}>
                    <Text style={styles.controlButtonText}>{'CANCEL'}</Text>
                </TouchableOpacity>
            </View>
        :   <TouchableOpacity style={[styles.controlButton, styles.deleteClip]} onPress={() => redux(actions.setConfirmDelete(true))}>
                <Text style={styles.controlButtonText}>{'DELETE CLIP'}</Text>
            </TouchableOpacity>
    )
}
