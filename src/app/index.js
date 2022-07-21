import React, { useState, useEffect } from 'react'
import { View, Platform, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Account from './account'
import * as WebBrowser from 'expo-web-browser'
import Drawer_Podware from './podware'
import Drawer_Clipper from './clipper'
import Drawer_Whitesocket from './whitesocket'
import { styles } from './clipper/styles'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Web_Clipper from './clipper/web'
import Web_Whitesocket from './whitesocket/web'

const Drawer = createDrawerNavigator()

export default () => {

    const [subdomain, setSubdomain] = useState(undefined)
    const [domain, setDomain] = useState(window.location.host)

    useEffect(() => {
        const array = domain.split('.')
        if (array.length > 1) {
            const subdom = array[array.length - 2].toLowerCase()
            const dom = array[array.length - 1].toLowerCase()
            setDomain(subdom.concat(dom))
            if (subdom === 'clipper') setSubdomain('clipper')
            else if (subdom === 'whitesocket') setSubdomain('whitesocket')
            else setSubdomain(undefined)
        }
        else setSubdomain(undefined)
    }, [])

    useEffect(() => {
        WebBrowser.openBrowserAsync(domain)
    }, [domain])

    const { loggedIn } = useSelector(state => state.account)

    if (Platform.OS === 'web') {
        if (loggedIn) {
            if (subdomain == 'clipper') return <Web_Clipper />
            else if (subdomain == 'whitesocket') return <Web_Whitesocket />
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
