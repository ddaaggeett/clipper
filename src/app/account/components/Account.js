import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform } from 'react-native'
import * as actions from '../../clipper/redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
// import UnfinishedVideosList from './UnfinishedVideosList'
import Login from './Login'
import SyncServer from './SyncServer'
import SourceCodeLink from './SourceCodeLink'
import TitleLink, { TitleText } from './TitleText'
import Logout from './Logout'
import Nav from './Nav'

const WebBar = () => {
    const { user } = useSelector(state => state.account)

    return (
        <View style={[styles.homeMenu, { borderColor: user ? 'red' : 'purple' }]}>
            <SourceCodeLink />
            <Nav />
            <TitleLink />
            { user ? <Logout /> : null }
        </View>
    )
}

export default (props) => {

    const redux = useDispatch()
    const { user } = useSelector(state => state.account)
    const { clips, pending } = useSelector(state => state.clips)
    let navigation
    Platform.OS !== 'web' ?  navigation = useNavigation() : null

    if (Platform.OS === 'web') return (
        <View>
            <WebBar />
            <Login />
        </View>
    )
    else return (
        <ScrollView style={styles.container}>
        {
            user
            ?   <View>
                    <Logout />
                    <TitleText />
                    {/*<UnfinishedVideosList />*/}
                    <SyncServer />
                </View>
            :   null
        }
        <Login />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    homeMenu: {
        flexDirection:"row",
        zIndex: 1,
        width: '100%',
        paddingTop: 5,
        margin: 0,
        borderBottomWidth: 2,
    },
})
