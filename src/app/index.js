import React, { useState, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import AccountScreen from './screens/AccountScreen'
import ClipManagerScreen from './screens/ClipManagerScreen'
import ClipperScreen from './screens/ClipperScreen'
import AudioScreen from '../app/audio/'
import Account from './components/Account'
import Clipper from './components/Clipper'
import Footer from './components/Footer'
import VideoSelector from './components/VideoSelector'
import ClipManager from './components/ClipManager'
import UnfinishedVideosList from './components/UnfinishedVideosList'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
import { serverIP, socketPort } from '../../config'
import { io } from 'socket.io-client'
import useDataSocketHook from './dataSocket'
const socket = io('http://'+ serverIP + ':' + socketPort)

const Tab = createBottomTabNavigator()

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
        const tabBarOptions = {
            tabBarActiveBackgroundColor: '#222',
            tabBarInactiveBackgroundColor: 'black',
            tabBarLabelPosition: 'beside-icon',
            tabBarLabelStyle:{fontSize:20,position:'absolute',color:'white'},
            tabBarShowIcon: false,
        }
        return (
            <View style={styles.container}>
            {
                loggedIn
                ?   <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen options={tabBarOptions} name="Audio" component={AudioScreen} />
                        <Tab.Screen options={tabBarOptions} name="Home" component={AccountScreen} />
                        <Tab.Screen options={tabBarOptions} name="Clipper" component={ClipperScreen} />
                        <Tab.Screen options={tabBarOptions} name="Clips" component={ClipManagerScreen} />
                    </Tab.Navigator>
                :   <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen name="Home" component={AccountScreen} options={{tabBarStyle: { display: 'none' }}} />
                    </Tab.Navigator>

            }
            </View>
        )
    }
}
