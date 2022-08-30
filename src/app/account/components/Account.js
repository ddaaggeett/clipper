import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform } from 'react-native'
import { serverIP, socketPort, appName } from '../../../../config'
import * as actions from '../../clipper/redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
// import UnfinishedVideosList from './UnfinishedVideosList'
import { io } from 'socket.io-client'
import Login from './Login'
import SyncServer from './SyncServer'
import SourceCodeLink from './SourceCodeLink'
import TitleLink, { TitleText } from './TitleText'
import LogoutButton from './Logout'
import Nav from './Nav'

const socket = io('http://'+ serverIP + ':' + socketPort.clipper)

export default (props) => {

    const redux = useDispatch()
    const { loggedIn, user } = useSelector(state => state.account)
    const { clips, pending } = useSelector(state => state.clips)
    let navigation
    Platform.OS !== 'web' ?  navigation = useNavigation() : null

    if (Platform.OS === 'web') return (
        <View>
            <View style={[styles.homeMenu, { borderColor: loggedIn ? 'red' : 'purple' }]}>
                <SourceCodeLink />
                <Nav />
                <TitleLink />
                { loggedIn ? <LogoutButton /> : null }
            </View>
            <Login />
        </View>
    )
    else return (
        <ScrollView style={styles.container}>
        {
            loggedIn
            ?   <View>
                    <TouchableOpacity
                        style={[styles.controlButton, {flex: 0, backgroundColor: 'red'}]}
                        onPress={() => handleLogout()}
                        >
                        <Text style={styles.controlButtonText}>Logout</Text>
                    </TouchableOpacity>
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
    controlButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor:'black',
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },

})
