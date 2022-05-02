import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { styles } from '../styles'
import { serverIP, socketPort, appName } from '../../../config'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import UnfinishedVideosList from './UnfinishedVideosList'
import { io } from 'socket.io-client'
import WelcomeUser from './WelcomeUser'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const redux = useDispatch()
    const navigation = useNavigation()
    const { loggedIn, user } = useSelector(state => state.account)
    const { clips, pending } = useSelector(state => state.clips)

    useEffect(() => {
        if (loggedIn) navigation.navigate('Clipper')
    }, [])

    useEffect(() => {
        if(loggedIn) navigation.navigate('Clipper')
    }, [loggedIn])

    const handleLogin = () => {
        const account = {
            user, // TODO: rid default account
        }
        redux(actions.login(account))
        socket.emit('userLog', user, userData => {
            redux(actions.updateUser(userData))
        })
        const packet = {
            userID: user.id,
            pendingClips: pending,
        }
        socket.emit('getUserClips', packet, userClips => {
            redux(actions.clearPending())
            redux(actions.updateClips(userClips))
        })
    }

    const handleLogout = async () => {
        redux(actions.logout())
    }

    return (
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
                    {
                        user !== null
                        ?   <Text style={[styles.username, styles.usernameNative]}>{`${appName}     ///     ${user.name}`}</Text>
                        :   <Text style={[styles.username, styles.usernameNative]}>{`${appName}     ///     GUEST`}</Text>
                    }
                    <UnfinishedVideosList />
                </View>
            :   null
        }
        <WelcomeUser handleLogin={handleLogin} />
        </ScrollView>
    )
}
