import React from 'react'
import * as actions from '../redux/actions/actionCreators'
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import { serverIP, socketPort } from '../../../config'
import { io } from 'socket.io-client'

const socket = io(`http://${serverIP}:${socketPort}`)

export default () => {

    const { pending } = useSelector(state => state.clips)
    const { user } = useSelector(state => state.account)
    const redux = useDispatch()

    const handleSync = () => {
        if (user !== null) {
            const packet = {
                userID: user.id,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => handleSync()}>
            <Text style={styles.text}>{'sync server'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 25,
        backgroundColor:'black',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'white',

    },
    text: {
        fontSize: 30,
        color: 'white',
    },
})
