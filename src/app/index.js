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

    const clips = useSelector(state => state.clips)
    const [dataSocketPromise, setDataSocketPromise] = useState(dataSocket())

    useEffect(() => {
        // TODO: custom hook because this is duplicate effect. see ./web/index.js
        dataSocketPromise.then(data => {
            var index
            switch(data.type) {
                case 'updateClip':
                    index = clips.findIndex(item => item.timestamp === data.clip.timestamp)
                    if ( index == -1 ) redux(actions.addClip(data.clip))
                    else redux(actions.updateClip(data.clip, index))
                    break

                case 'deleteClip':
                    index = clips.findIndex(item => item.timestamp === data.clip.timestamp)
                    if (index != -1) {
                        const newClips = clips.slice(0, index).concat(clips.slice(index + 1, clips.length))
                        redux(actions.updateClips(newClips))
                    }
                    break

            }
            setDataSocketPromise(dataSocket())
        })
    }, [dataSocketPromise])

    useEffect(() => {
        socket.emit('getUserClips', user.id, userClips => {
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
