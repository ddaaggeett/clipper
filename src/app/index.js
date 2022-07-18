import React, { useState, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import AccountScreen from './AccountScreen'
import AudioScreen from '../app/audio/'
import Drawer_Clipper from './clipper'
import Drawer_Whitesocket from './whitesocket'
import WebApp from './web'
import { styles } from './clipper/styles'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default () => {

    if (Platform.OS === 'web') {
        return (
            <WebApp />
        )
    }
    else {
        if(!loggedIn) return (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="User" component={AccountScreen} />
            </Drawer.Navigator>
        )
        else return (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="User" component={AccountScreen} />
                <Drawer.Screen name="Audio" component={AudioScreen} />
                <Drawer.Screen name="Clipper" component={Drawer_Clipper} />
                <Drawer.Screen name="Whitesocket" component={Drawer_Whitesocket} />
            </Drawer.Navigator>
        )
    }
}
