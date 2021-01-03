import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React, {
    useState,
} from 'react'
import Clipper from './components/Clipper'
import ClipManager from './components/ClipManager'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const ClipperScreen = () => {
    return (
        <View  style={styles.container}>
            <Clipper />
        </View>
    )
}

const ClipManagerScreen = () => {
    return (
        <View  style={styles.container}>
            <ClipManager />
        </View>
    )
}

const tabBarOptions = {
    activeBackgroundColor: '#222',
    inactiveBackgroundColor: 'black',
    labelPosition: 'beside-icon',
    labelStyle:{fontSize:20,position:'absolute',color:'white'},
}

export default () => {
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen name="Clipper" component={ClipperScreen} />
            <Tab.Screen name="Clips" component={ClipManagerScreen} />
        </Tab.Navigator>
    )
}
