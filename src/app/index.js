import React, { useState, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as WebBrowser from 'expo-web-browser'
import Account from './account'
import Drawer_Podware from './podware'
import Drawer_Clipper from './clipper'
import Drawer_Whitesocket from './whitesocket'
import { styles } from './clipper/styles'
import { createDrawerNavigator } from '@react-navigation/drawer'
import WebSwitcher, { webapps } from './web'

const Drawer = createDrawerNavigator()

export default () => {

    const { loggedIn } = useSelector(state => state.account)
    const [subdomain, setSubdomain] = useState(null)

    useEffect(() => {
        const host = window.location.host
        const array = host.split('.')
        const cutIndex = host.includes('localhost') ? -1 : -2
        const birray = array.slice(0, cutIndex)
        if (birray.length > 0) setSubdomain(birray[0].toLowerCase())
    }, [])

    if (Platform.OS === 'web') {
        return (
            <View>
            <Account />
            <WebSwitcher
                subdomain={subdomain}
                />
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
