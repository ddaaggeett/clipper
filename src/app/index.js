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
import ClipDetails from './components/ClipDetails'
import { styles } from './styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

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
            <Stack.Navigator>
                <Stack.Screen name="ClipManager" component={ClipManager} options={{headerShown: false}} />
                <Stack.Screen name="ClipDetails" component={ClipDetails} options={{headerShown: false}} />
            </Stack.Navigator>
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
