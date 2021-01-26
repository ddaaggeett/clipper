import React, {
    useState,
    useEffect,
} from 'react'
import { View } from 'react-native'
import AccountScreen from './screens/AccountScreen'
import ClipManagerScreen from './screens/ClipManagerScreen'
import ClipperScreen from './screens/ClipperScreen'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import {
    serverIP,
    port,
} from '../../config'
import { io } from 'socket.io-client'
const socket = io('http://'+ serverIP + ':' + port)

const Tab = createBottomTabNavigator()

export default () => {

    const loggedIn = useSelector(state => state.account.loggedIn)
    const clips = useSelector(state => state.clips)

    useEffect(() => {
        if(loggedIn) {
            socket.emit('allClips', clips, received => {
                if(received) console.log('server received all clips')
            })
        }
    },[loggedIn]) // run only once on startup


    const tabBarOptions = {
        activeBackgroundColor: '#222',
        inactiveBackgroundColor: 'black',
        labelPosition: 'beside-icon',
        labelStyle:{fontSize:20,position:'absolute',color:'white'},
    }

    return (
        <View style={styles.container}>
        {
            loggedIn
            ?   <Tab.Navigator tabBarOptions={tabBarOptions}>
                    <Tab.Screen name="Account" component={AccountScreen} />
                    <Tab.Screen name="Clipper" component={ClipperScreen} />
                    <Tab.Screen name="Clips" component={ClipManagerScreen} />
                </Tab.Navigator>
            :   <Tab.Navigator tabBarOptions={tabBarOptions}>
                    <Tab.Screen name="Account" component={AccountScreen} />
                </Tab.Navigator>

        }
        </View>
    )
}
