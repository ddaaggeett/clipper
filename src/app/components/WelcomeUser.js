import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import { appName } from '../../../config'
import { styles } from '../styles'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import CreateAccount from './CreateAccount'

export default () => {

    const redux = useDispatch()
    const { loggedIn } = useSelector(state => state.account)

    const [newAccount, setNewAccount] = useState(false)

    const handleGuestMode = () => {
        redux(actions.login({
            user: null
        }))
    }

    var welcomeStyle
    var welcomeFontStyle

    if (Platform.OS === 'web') {
        welcomeStyle = {
            top:100,
            width: 400,
        }
        welcomeFontStyle = {
            margin: 50,
            fontSize: 30,
        }
    }
    else {
        welcomeStyle = {
            top:20,
            width: '100%',
        }
        welcomeFontStyle = {
            margin: 20,
            fontSize: 20,
        }
    }

    if (loggedIn) return null
    else return (
        <View style={[welcomeStyle, styles.welcome]}>
        {
        newAccount
        ?   <CreateAccount
                setNewAccount={setNewAccount}
                />
        :   <View>
            <Text style={[welcomeFontStyle, styles.welcomeText]}>{`welcome to ${appName.toUpperCase()}!`}</Text>
            <View style={styles.contentRow}>
                <TouchableOpacity
                    style={[styles.accountButton, styles.logoutButton, { marginRight: 5 }]}
                    onPress={() => handleGuestMode()}
                    >
                    <Text style={styles.controlButtonText}>Continue as Guest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.accountButton, styles.logoutButton, { marginLeft: 5 }]}
                    onPress={() => setNewAccount(true)}
                    >
                    <Text style={styles.controlButtonText}>Create an Account</Text>
                </TouchableOpacity>
            </View>
            </View>
        }
        </View>
    )

}
