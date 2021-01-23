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
import * as AppAuth from 'expo-app-auth'
import * as actions from '../redux/actions/actionCreators'
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import PlaylistSelector from './PlaylistSelector'

export default () => {

    const redux = useDispatch()
    const loggedIn = useSelector(state => state.account.loggedIn)
    const user = useSelector(state => state.account.user)
    const accessToken = useSelector(state => state.account.accessToken)
    const idToken = useSelector(state => state.account.idToken)
    const refreshToken = useSelector(state => state.account.refreshToken)

    const accountAccessConfig = {
        androidClientId: androidClientId,
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/youtube',
        ],
    }

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync(accountAccessConfig)

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

    const handleLogout = async () => {
        await Google.logOutAsync({accessToken, ...accountAccessConfig})
        redux(actions.logout())
    }

    const handleRefreshTokens = () => {
        refreshAccessToken().then(data => {
            redux(actions.setAccessToken(data.accessToken, data.accessTokenExpirationDate))
        }).catch(error => console.log(error))
    }

    const refreshAccessToken = async () => {
        return new Promise((resolve, reject) => {
            AppAuth.refreshAsync({
                issuer: 'https://accounts.google.com',
                clientId: androidClientId,
            }, refreshToken).then(result => {
                const authInfo = {
                    accessToken: result.accessToken,
                    accessTokenExpirationDate: result.accessTokenExpirationDate,
                }
                resolve(authInfo)
            })
        })
    }

    return (
        <ScrollView>
        {
            loggedIn
            ?   <View>
                    <Text style={{color:'white'}}>{`you are logged into YouTube, ${user.name}`}</Text>
                    <TouchableOpacity
                        style={[styles.controlButton, {backgroundColor: 'red'}]}
                        onPress={() => handleLogout()}
                        >
                        <Text style={styles.controlButtonText}>Logout</Text>
                    </TouchableOpacity>
                    <PlaylistSelector />
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => handleRefreshTokens()}
                        >
                        <Text style={styles.controlButtonText}>refresh tokens</Text>
                    </TouchableOpacity>

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
