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
import * as actions from './redux/actions/actionCreators'

const Drawer = createDrawerNavigator()

export default () => {

    const redux = useDispatch()
    const { webapp } = useSelector(state => state.xyz)
    const { loggedIn } = useSelector(state => state.account)

    useEffect(() => {
        const array = window.location.host.split('.')
        if (array.length > 1) {
            const subdom = array[array.length - 2].toLowerCase()
            const dom = array[array.length - 1].toLowerCase()
            if (subdom === 'clipper') redux(actions.updateWebApp('clipper'))
            else if (subdom === 'whitesocket') redux(actions.updateWebApp('whitesocket'))
            else redux(actions.updateWebApp(undefined))
        }
        else redux(actions.updateWebApp(undefined))
    }, [])

    if (Platform.OS === 'web') {
        if (loggedIn) {
            if (webapp == 'clipper') return <Web_Clipper />
            else if (webapp == 'whitesocket') return <Web_Whitesocket />
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
