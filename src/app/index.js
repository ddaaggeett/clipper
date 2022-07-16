import React, { useState, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import AccountScreen from './AccountScreen'
import AudioScreen from '../app/audio/'
import Drawer_Clipper from './clipper/nav'
import Drawer_Whitesocket from './whitesocket/nav'
import WebApp from './web'
import { styles } from './clipper/styles'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './clipper/redux/actions/actionCreators'
import { serverIP, socketPort } from '../../config'
import { io } from 'socket.io-client'
import useDataSocketHook from './dataSocket'
const socket = io('http://'+ serverIP + ':' + socketPort)

const Drawer = createDrawerNavigator()

export default () => {

    const { loggedIn, user } = useSelector(state => state.account)
    const redux = useDispatch()
    const { clips, pending } = useSelector(state => state.clips)

    useDataSocketHook()

    useEffect(() => {
        if (Platform.OS === 'web') {
            const width = Dimensions.get('window').width / 2
            if (width > 640) redux(actions.setWebPanelWidth(640))
            else redux(actions.setWebPanelWidth(width))
        }
        if (loggedIn && user !== null) {
            const packet = {
                userID: user.id,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        }
    }, [])

    if (Platform.OS === 'web') {
        return (
            <WebApp />
        )
    }
    else {
        if(!loggedIn) return (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="User" component={AccountScreen} />
            </Drawer.Navigator>
        )
        else return (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="User" component={AccountScreen} />
                <Drawer.Screen name="Audio" component={AudioScreen} />
                <Drawer.Screen name="Clipper" component={Drawer_Clipper} />
                <Drawer.Screen name="Whitesocket" component={Drawer_Whitesocket} />
            </Drawer.Navigator>
        )
    }
}
