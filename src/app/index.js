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
import Web_Clipper from './clipper/web'
import Web_Whitesocket from './whitesocket/web'
const { webapps } = require('./web')

const Drawer = createDrawerNavigator()

export default () => {

    const { loggedIn } = useSelector(state => state.account)

    const [subdomain, setSubdomain] = useState(null)

    useEffect(() => {
        const host = window.location.host
        const array = host.split('.')
        const birray = array.slice(0, host.includes('localhost') ? -1 : -2)
        if (birray.length > 0) setSubdomain(birray[0].toLowerCase())
    }, [])

    useEffect(() => {
        setRequestedWebApp(subdomain)
    }, [subdomain])

    const [requestedWebApp,setRequestedWebApp] = useState(webapps.find((app) => app.name === subdomain))

    if (Platform.OS === 'web') {
        if (subdomain) {
            if (requestedWebApp) {
                if (requestedWebApp == 'clipper') return <Web_Clipper />
                else if (requestedWebApp == 'whitesocket') return <Web_Whitesocket />
            }
            else return <Account />
        }
        else return <Account />
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
