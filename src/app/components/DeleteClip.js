import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.manager)
    const { clips } = useSelector(state => state.clips)
    const clip = clips[editIndex]
    const [confirmDelete, setConfirmDelete] = useState(false)
    const redux = useDispatch()

    const deleteClip = () => {
        redux(actions.setEditIndex(null))
        if(Platform.OS !== 'web') props.saveAndExit()
        redux(actions.pendingDeleteClip({ ...clip, deleted: true }))
        socket.emit('deleteClip', clip, returnedClip => {
            redux(actions.fulfillPendingDelete(returnedClip))
        })
    }

    var buttonWidth
    if(Platform.OS === 'web') buttonWidth = useSelector(state => state.player.width)/2
    else buttonWidth = Dimensions.get('window').width/2

    return (
        confirmDelete
        ?   <View style={styles.contentRow}>
                <TouchableOpacity style={[styles.controlButton, styles.deleteClip, {width: buttonWidth}]} onPress={() => deleteClip()}>
                    <Text style={styles.controlButtonText}>{'CONFIRM DELETE'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor:'orange', width: buttonWidth}]} onPress={() => setConfirmDelete(false)}>
                    <Text style={styles.controlButtonText}>{'CANCEL'}</Text>
                </TouchableOpacity>
            </View>
        :   <TouchableOpacity style={[styles.controlButton, styles.deleteClip]} onPress={() => setConfirmDelete(true)}>
                <Text style={styles.controlButtonText}>{'DELETE CLIP'}</Text>
            </TouchableOpacity>
    )
}
