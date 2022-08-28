import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Platform, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as WebBrowser from 'expo-web-browser'
import Account from './xyz'
import Drawer_Podware from './podware'
import Drawer_Clipper from './clipper'
import Drawer_Whitesocket from './whitesocket'
import { createDrawerNavigator } from '@react-navigation/drawer'
import WebApp from './web'

const Drawer = createDrawerNavigator()

export default () => {

    const { loggedIn, webapp } = useSelector(state => state.xyz)

    if (Platform.OS === 'web') {
        return (
            <WebApp />
        )
    }
    else {
        if(!loggedIn) return (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Profile" component={Account} />
            </Drawer.Navigator>
        )
        else return (
            <Drawer.Navigator screenOptions={{ headerShown: false }}>
                <Drawer.Screen name="Profile" component={Account} />
                <Drawer.Screen name="Podware" component={Drawer_Podware} />
                <Drawer.Screen name="Clipper" component={Drawer_Clipper} />
                <Drawer.Screen name="Whitesocket" component={Drawer_Whitesocket} />
            </Drawer.Navigator>
        )
    }
}
