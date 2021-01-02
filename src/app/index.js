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

export default () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Clipper" component={ClipperScreen} />
            <Tab.Screen name="ClipManager" component={ClipManagerScreen} />
        </Tab.Navigator>
    )
}
