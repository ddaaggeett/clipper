import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import * as actions from '../redux/actions/actionCreators'
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector, useDispatch } from 'react-redux'
import { serverIP, socketPort } from '../../../config'
import { io } from 'socket.io-client'
import configureRedux from '../redux'
import configureReduxWeb from '../redux/web'
import AppMain from '../'

const socket = io(`http://${serverIP}:${socketPort}`)

export default () => {

    const redux = useDispatch()

    const handlePurge = () => {
        redux(actions.purgeRedux(true))
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => handlePurge()}>
            <Text style={styles.text}>{'purge redux'}</Text>
        </TouchableOpacity>
    )
}

export const Persistor = () => {

    const app = useSelector(state => state.app)
    const [persistor,setPersistor] = React.useState(configureRedux().persistor)
    const [persistorWeb,setPersistorWeb] = React.useState(configureReduxWeb().persistor)

    React.useEffect(() => {
        if (app.purgeRedux) {
            setPersistor(configureRedux().persistor)
            setPersistorWeb(configureReduxWeb().persistor)
        }
    }, [app.purgeRedux])

    if (Platform.OS === 'web') return (
        <PersistGate loading={null} persistor={persistorWeb}>
        <AppMain />
        </PersistGate>
    )
    else return (
        <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        <AppMain />
        </NavigationContainer>
        </PersistGate>
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
