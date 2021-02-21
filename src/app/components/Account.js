import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles'
import { androidClientId, serverIP, port } from '../../../config'
import * as Google from 'expo-google-app-auth'
import * as AppAuth from 'expo-app-auth'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import Settings from './Settings'
import { io } from 'socket.io-client'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const redux = useDispatch()
    const { loggedIn, user, accessToken, refreshToken, accessExpirationTime } = useSelector(state => state.account)
    const clips = useSelector(state => state.clips)

    const [refreshInterval, setRefreshInterval] = useState()

    useEffect(() => {
        if(loggedIn) {
            const intervalTime = 1000
            setRefreshInterval(setInterval(() => {
                if ((accessExpirationTime - Date.now()) < intervalTime) {
                    handleRefreshTokens()
                }
            }, intervalTime))
        }
        else clearInterval(refreshInterval)
    }, [loggedIn])

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
        const accessExpirationTime = Date.now() + 3600000 // assumed hour
        const user = {
            id: loginResult.user.email,
            email: loginResult.user.email,
            name: loginResult.user.name,
            picture: loginResult.user.photoUrl,
        }
        const account = {
            accessToken: loginResult.accessToken,
            refreshToken: loginResult.refreshToken,
            accessExpirationTime,
            user,
        }
        redux(actions.login(account))
        socket.emit('userLog', user, userData => {
            redux(actions.updateUser(userData))
        })
        socket.emit('getUserClips', user.id, userClips => {
            redux(actions.updateClips(userClips))
        })
    }

    const handleLogout = async () => {
        await Google.logOutAsync({accessToken, ...accountAccessConfig})
        redux(actions.logout())
    }

    const handleRefreshTokens = () => {
        refreshAccessToken().then(data => {
            const accessExpirationTime = Date.parse(data.accessTokenExpirationDate)
            redux(actions.setAccessToken(data.accessToken, accessExpirationTime))
        }).catch(error => console.log(error))
    }

    const refreshAccessToken = async () => {
        return new Promise((resolve, reject) => {
            AppAuth.refreshAsync({
                issuer: 'https://accounts.google.com',
                clientId: androidClientId, // TODO: iosClientId, etc.
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
        <View style={styles.container}>
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
                    <Settings navigation={props.navigation} />
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
        </View>
    )
}
