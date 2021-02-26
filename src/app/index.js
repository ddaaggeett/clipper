import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import AccountScreen from './screens/AccountScreen'
import ClipManagerScreen from './screens/ClipManagerScreen'
import ClipperScreen from './screens/ClipperScreen'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
import { serverIP, port } from '../../config'
import { io } from 'socket.io-client'
import dataSocket from './dataSocket'
const socket = io('http://'+ serverIP + ':' + port)

const Tab = createBottomTabNavigator()

export default () => {

    const { loggedIn, user } = useSelector(state => state.account)
    const redux = useDispatch()

    const { clips, pending } = useSelector(state => state.clips)
    const [dataSocketPromise, setDataSocketPromise] = useState(dataSocket())

    useEffect(() => {
        // TODO: custom hook because this is duplicate effect. see ./web/index.js
        dataSocketPromise.then(data => {
            var index
            switch(data.type) {
                case 'updateClip':
                    redux(actions.updateClip(data.clip))
                    break

                case 'deleteClip':
                    redux(actions.deleteClip(data.clip))
                    break

            }
            setDataSocketPromise(dataSocket())
        })
    }, [dataSocketPromise])

    useEffect(() => {
        const packet = {
            user_id: user.id,
            pendingClips: pending,
        }
        socket.emit('getUserClips', packet, userClips => {
            redux(actions.clearPending())
            redux(actions.updateClips(userClips))
        })
    }, [])

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
