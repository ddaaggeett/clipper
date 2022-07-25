import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Platform, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as WebBrowser from 'expo-web-browser'
import Account from './account'
import Footer from './clipper/components/Footer'
import Drawer_Podware from './podware'
import Drawer_Clipper from './clipper'
import Drawer_Whitesocket from './whitesocket'
import { createDrawerNavigator } from '@react-navigation/drawer'
import WebSwitcher from './web'

const Drawer = createDrawerNavigator()

export default () => {

    const { loggedIn } = useSelector(state => state.account)
    const { webapp } = useSelector(state => state.xyz)

    if (Platform.OS === 'web') {
        return (
            <View style={styles.browser} >
                <Account />
                <Footer />
                <WebSwitcher />
            </View>
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

export const styles = StyleSheet.create({
    browser: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'black',
    },
})
