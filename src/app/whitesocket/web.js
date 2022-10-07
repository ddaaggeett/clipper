import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Whitesocket from './web/app'
import Arucos from './web/Arucos'
import * as actions from './redux/actions/actionCreators'
const { borderWidth } = require('./constants')

const OpenWhitesocket = () => {

    const redux = useDispatch()

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => redux(actions.updateAppOpened(true))}
            >
            <Text>Open Whitesocket App</Text>
        </TouchableOpacity>
    )
}

export default () => {

    const whitesocket = useSelector(state => state.whitesocket)

    return (
        <View style={styles.container}>
        {
            whitesocket.appOpened
            ?   <Whitesocket />
            :   <OpenWhitesocket />
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: borderWidth,
        bottom: borderWidth,
        left: borderWidth,
        right: borderWidth,
    },
    button: {
        alignSelf:'center',
        marginTop: 100,
        backgroundColor: 'white',
        padding: 10,
    },
})
