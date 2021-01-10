import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native"
import React, {
    useState,
} from 'react'
import Clipper from './components/Clipper'
import VideoSelector from './components/VideoSelector'
import ClipManager from './components/ClipManager'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const ClipperScreen = () => {
    return (
        <ScrollView  style={[styles.container,{paddingTop:25}]}>
            <Clipper />
            <VideoSelector />
        </ScrollView>
    )
}

const ClipManagerScreen = () => {
    return (
        <View  style={[styles.container,{paddingTop:25}]}>
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
