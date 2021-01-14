import React from 'react'
import AccountScreen from './screens/AccountScreen'
import ClipManagerScreen from './screens/ClipManagerScreen'
import ClipperScreen from './screens/ClipperScreen'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default () => {

    const tabBarOptions = {
        activeBackgroundColor: '#222',
        inactiveBackgroundColor: 'black',
        labelPosition: 'beside-icon',
        labelStyle:{fontSize:20,position:'absolute',color:'white'},
    }

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Clipper" component={ClipperScreen} />
            <Tab.Screen name="Clips" component={ClipManagerScreen} />
        </Tab.Navigator>
    )
}
