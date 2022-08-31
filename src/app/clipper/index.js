import { useEffect } from 'react'
import { Platform, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ClipperScreen from './ClipperScreen'
import ClipManagerScreen from './ClipManagerScreen'
import { useInitUserSession } from './hooks'

const Tab = createBottomTabNavigator()

export default () => {

    useInitUserSession()

    const tabBarOptions = {
        tabBarActiveBackgroundColor: '#222',
        tabBarInactiveBackgroundColor: 'black',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle:{fontSize:20,position:'absolute',color:'white'},
        tabBarShowIcon: false,
    }
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen options={tabBarOptions} name="Clip" component={ClipperScreen} />
            <Tab.Screen options={tabBarOptions} name="Clips" component={ClipManagerScreen} />
        </Tab.Navigator>
    )
}
