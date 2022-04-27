import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, Platform } from 'react-native'
import { styles } from '../../styles'
import { serverIP, socketPort, appName } from '../../../../config'
import SourceCodeLink from '../../components/SourceCodeLink'
import * as actions from '../../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import WelcomeUser from '../../components/WelcomeUser'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const redux = useDispatch()
    const { loggedIn, user } = useSelector(state => state.account)
    const { clips, pending } = useSelector(state => state.clips)

    const handleLogin = () => {
        const account = {
            user,
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

    const handleLogout = () => {
        redux(actions.logout())
    }

    return (
        <View>
        <View style={[styles.account, { position: 'fixed', borderColor: loggedIn ? 'red' : 'purple' }]}>
        {
            loggedIn
            ?   <View style={styles.contentRow}>
                    <SourceCodeLink />
                    {
                        user !== null
                        ?   <Text style={styles.username}>{`${appName}     ///     ${user.name}`}</Text>
                        :   <Text style={styles.username}>{`${appName}     ///     GUEST`}</Text>
                    }
                    <TouchableOpacity
                        style={[styles.accountButton, styles.loginButton]}
                        onPress={() => handleLogout()}
                        >
                        <Text style={styles.controlButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            :   <View style={styles.contentRow}>
                    <SourceCodeLink />
                </View>
        }
        </View>
        <WelcomeUser />
        </View>
    )
}
