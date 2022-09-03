import { SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './account/redux/actions/actionCreators'
import ClipperWeb from './clipper/web'
import WhitesocketWeb from './whitesocket/web'
import PodwareWeb from './podware/web'
import Account from './account/components/Account'
import Nav from './account/components/Nav'
import Footer from './account/components/Footer'
import { initWebApp } from './hooks'

const AppSwitcher = () => {

    const redux = useDispatch()
    const { user, webapp } = useSelector(state => state.account)

    if (user && webapp) {
        if (webapp === 'clipper') return <ClipperWeb />
        else if (webapp === 'whitesocket') return null
        // else if (webapp == 'whitesocket') return <WhitesocketWeb />
        else if (webapp === 'podware') return <PodwareWeb />
    }
    else return null
}

export default () => {

    const redux = useDispatch()
    const { webapp } = useSelector(state => state.account)
    initWebApp()

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

const styles = StyleSheet.create({
    browser: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
})
