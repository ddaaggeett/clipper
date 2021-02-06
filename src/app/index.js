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
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import * as actions from './redux/actions/actionCreators'
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
    const redux = useDispatch()

    useEffect(() => {
        if(loggedIn) {
            socket.emit('allClips', clips, updatedClipsFromDB => {
                updatedClipsFromDB.forEach(clipFromDB => {
                    const index = clips.findIndex(clip => clip.timestamp === clipFromDB.timestamp)
                    redux(actions.updateClip(clipFromDB, index))
                })
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
