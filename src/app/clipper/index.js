import { useEffect } from 'react'
import { Platform, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { serverIP, socketPort } from '../../../config'
import ClipperScreen from './ClipperScreen'
import ClipManagerScreen from './ClipManagerScreen'
import useDataSocketHook from './dataSocket'
import * as actions from './redux/actions/actionCreators'
import { io } from 'socket.io-client'

const socket = io('http://'+ serverIP + ':' + socketPort.clipper)

const Tab = createBottomTabNavigator()

export default () => {

    useDataSocketHook()

    const redux = useDispatch()
    const { loggedIn, user } = useSelector(state => state.account)
    const { pending } = useSelector(state => state.clips)

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

    const tabBarOptions = {
        tabBarActiveBackgroundColor: '#222',
        tabBarInactiveBackgroundColor: 'black',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle:{fontSize:20,position:'absolute',color:'white'},
        tabBarShowIcon: false,
    }
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen options={tabBarOptions} name="Clipper" component={ClipperScreen} />
            <Tab.Screen options={tabBarOptions} name="Clips" component={ClipManagerScreen} />
        </Tab.Navigator>
    )
}
