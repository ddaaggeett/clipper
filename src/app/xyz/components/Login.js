import { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Platform, TextInput } from 'react-native'
import { appName, serverIP, socketPort } from '../../../../config'
import * as accountActions from '../../redux/actions/actionCreators'
import * as actions from '../../clipper/redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import CreateAccount from './CreateAccount'
import { io } from 'socket.io-client'

const socket = io('http://'+ serverIP + ':' + socketPort.xyz)

export default (props) => {

    const redux = useDispatch()
    const { loggedIn } = useSelector(state => state.xyz)

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
    else return <AccountOptions welcomeFontStyle={welcomeFontStyle} />
}

const AccountOptions = (props) => {

    const [newAccount, setNewAccount] = useState(false)
    const [accountOption, setAccountOption] = useState(undefined)

    useEffect(() => {
        setAccountOption(undefined)
    }, [])

    if (accountOption == 'create') return <CreateAccount setAccountOption={setAccountOption} />
    else if (accountOption == 'signin') return <SignInAccount setAccountOption={setAccountOption} />
    else return (
        <View>
            <Text style={[props.welcomeFontStyle, styles.welcomeText]}>{`welcome to ${appName.toUpperCase()}!`}</Text>
            <View style={styles.contentRow}>
                <TouchableOpacity
                    style={[styles.accountButton, styles.logoutButton, { marginRight: 5 }]}
                    onPress={() => setAccountOption('signin')}
                    >
                    <Text style={styles.controlButtonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.accountButton, styles.logoutButton, { marginLeft: 5 }]}
                    onPress={() => setAccountOption('create')}
                    >
                    <Text style={styles.controlButtonText}>Create an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const SignInAccount = (props) => {

    const redux = useDispatch()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [loginInfo, setLoginInfo] = useState(null)

    useEffect(() => {
        setLoginInfo({
            id,
            password,
        })
    }, [id, password])

    const handleLogin = (loginInfo) => {
        socket.emit('login', loginInfo, account => {
            if (account) redux(accountActions.login(account))
        })
    }

    return (
        <View style={{width: '100%'}}>
        <Text style={[{margin: 10}, styles.controlButtonText]}>Sign into your account</Text>
            <View>
                <TextInput
                    style={styles.urlText}
                    onChangeText={text => setId(text)}
                    value={id}
                    placeholder={"screen name"}
                    placeholderTextColor={"white"}
                    />
                <TextInput
                    style={styles.urlText}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder={"password"}
                    placeholderTextColor={"white"}
                    secureTextEntry={true}
                    />
            </View>
            <View style={styles.contentRow}>
                <TouchableOpacity
                    style={[styles.controlButton, {backgroundColor: 'green'}]}
                    onPress={() => handleLogin(loginInfo)}
                    >
                    <Text style={styles.controlButtonText}>Enter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.controlButton, {backgroundColor: 'red'}]}
                    onPress={() => props.setAccountOption(undefined)}
                    >
                    <Text style={styles.controlButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeText: {
        color: 'white',
    },
    logoutButton: {
        backgroundColor: 'purple',
    },
    accountButton: {
        padding: 7,
        paddingLeft: 25,
        paddingRight: 25,
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    urlText: {
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
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
    contentRow: {
        flexDirection:"row",
    },
})
