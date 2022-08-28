import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import * as actions from '../../redux/actions/actionCreators'
import { styles as styles_ } from '../../clipper/styles'

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
            <Text style={styles_.controlButtonText}>Logout</Text>
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    accountButton: {
        padding: 7,
        paddingLeft: 25,
        paddingRight: 25,
    },
    loginButton: {
        backgroundColor: 'red',
    },
})
