import React, {
    useState,
} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native'
import { styles } from '../styles'
import { androidClientId } from '../../../config'
import * as Google from 'expo-google-app-auth'
import * as actions from '../redux/actions/actionCreators'
import {
    useSelector,
    useDispatch,
} from 'react-redux'

export default () => {

    const redux = useDispatch()
    const account = useSelector(state => state.account)

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: androidClientId,
                // iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
            })

            if (result.type === 'success') {
                return (result)
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    const handleLogin = async () => {
        const loginResult = await signInWithGoogleAsync()
        redux(actions.login(loginResult))
    }

    return (
        <ScrollView>
        {
            account.loggedIn
            ?   <View>
                    <Text style={styles.controlButtonText}>{JSON.stringify(account,null,4)}</Text>
                </View>
            :   <View>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => handleLogin()}
                        >
                        <Text style={styles.controlButtonText}>Login with Google</Text>
                    </TouchableOpacity>
                </View>
        }
        </ScrollView>
    )
}
