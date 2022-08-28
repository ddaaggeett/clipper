import { SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './redux/actions/actionCreators'
import ClipperWeb from './clipper/web'
import WhitesocketWeb from './whitesocket/web'
import PodwareWeb from './podware/web'
import Account from './xyz/components/Account'
import Nav from './xyz/components/Nav'
import Footer from './xyz/components/Footer'

const AppSwitcher = () => {

    const redux = useDispatch()
    const { loggedIn, webapp } = useSelector(state => state.xyz)

    useEffect(() => {
        const host = window.location.host
        const array = host.split('.')
        const cutIndex = host.includes('localhost') ? -1 : -2
        const subdomain = array.slice(0, cutIndex)
        const domain = array.slice(cutIndex)[0]
        redux(actions.updateDomain(domain))
        if (subdomain.length > 0) redux(actions.updateWebApp(subdomain[0].toLowerCase()))
    }, [])

    if (webapp == 'clipper' && loggedIn) return <ClipperWeb />
    else if (webapp == 'whitesocket' && loggedIn) return <WhitesocketWeb />
    else if (webapp == 'podware' && loggedIn) return <PodwareWeb />
    else return null
}

export default () => {

    const redux = useDispatch()
    const { webapp } = useSelector(state => state.xyz)

    return (
        <SafeAreaProvider>
        <View style={styles.browser} >
            <Account />
            <AppSwitcher />
            <Footer />
        </View>
        </SafeAreaProvider>
    )
}

export const styles = StyleSheet.create({
    browser: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
})
