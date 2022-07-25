import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, ScrollView, Platform } from 'react-native'
import { styles } from '../../clipper/styles'
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

const socket = io('http://'+ serverIP + ':' + socketPort.clipper)

export default (props) => {

    const redux = useDispatch()
    const { loggedIn, user } = useSelector(state => state.account)
    const { clips, pending } = useSelector(state => state.clips)
    let navigation
    Platform.OS !== 'web' ?  navigation = useNavigation() : null

    const handleLogin = (account) => {
        redux(actions.login(account))
        socket.emit('userLog', account.user, userObject => {
            redux(actions.updateUser(userObject))
            const packet = {
                userID: userObject.id,
                pendingClips: pending,
            }
            socket.emit('getUserClips', packet, userClips => {
                redux(actions.clearPending())
                redux(actions.updateClips(userClips))
            })
        })
    }

    const handleLogout = async () => {
        redux(actions.logout())
    }

    if (Platform.OS === 'web') return (
        <View>
        <View style={[styles.account, { position: 'fixed', borderColor: loggedIn ? 'red' : 'purple' }]}>
        {
            loggedIn
            ?   <View style={styles.contentRow}>
                    <SourceCodeLink />
                    <TitleLink />
                    <TouchableOpacity
                        style={[styles.accountButton, styles.loginButton]}
                        onPress={() => handleLogout()}
                        >
                        <Text style={styles.controlButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            :   <View style={styles.contentRow}>
                    <SourceCodeLink />
                    <TitleLink />
                </View>
        }
        </View>
        <Login handleLogin={handleLogin} />
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
        <Login handleLogin={handleLogin} />
        </ScrollView>
    )
}
