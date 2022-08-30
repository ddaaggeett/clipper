import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import * as actions from '../redux/actions/actionCreators'

export default () => {

    const redux = useDispatch()

    const handleLogout = async () => {
        redux(actions.logout())
    }

    return (
        <TouchableOpacity
            style={[styles.accountButton, styles.loginButton]}
            onPress={() => handleLogout()}
            >
            <Text style={styles.controlButtonText}>Logout</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    accountButton: {
        padding: 7,
        paddingLeft: 25,
        paddingRight: 25,
    },
    loginButton: {
        backgroundColor: 'red',
    },
})
