import React, { useState, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import AccountScreen from './AccountScreen'
import AudioScreen from '../app/audio/'
import Account from './clipper/components/Account'
import Clipper from './clipper/components/Clipper'
import Footer from './clipper/components/Footer'
import VideoSelector from './clipper/components/VideoSelector'
import ClipManager from './clipper/components/ClipManager'
import UnfinishedVideosList from './clipper/components/UnfinishedVideosList'
import Drawer_Clipper from './clipper/nav'
import Drawer_Whitesocket from './whitesocket/nav'
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
    const { panelWidth } = useSelector(state => state.app)
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
        if(!loggedIn) return (
            <View style={styles.container}>
                <Account />
            </View>
        )
        else return (
            <View style={styles.container}>
                <Account />
                <View style={[styles.panelRow, styles.contentRow]}>
                    <View style={[styles.videoPanel, {position: 'fixed', width: panelWidth}]}>
                        <VideoSelector />
                        <Clipper />
                    </View>
                    <View style={[styles.clipsPanel, {width: panelWidth}]}>
                        <ClipManager />
                        {/*<UnfinishedVideosList />*/}
                    </View>
                </View>
                <Footer />
            </View>
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
