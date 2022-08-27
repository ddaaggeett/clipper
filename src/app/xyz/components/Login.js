import { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Platform, TextInput } from 'react-native'
import { appName } from '../../../../config'
import { styles as styles_ } from '../../clipper/styles'
import * as actions from '../../clipper/redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import CreateAccount from './CreateAccount'

export default (props) => {

    const redux = useDispatch()
    const { loggedIn } = useSelector(state => state.account)

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
    else return <AccountOptions handleLogin={props.handleLogin} welcomeFontStyle={welcomeFontStyle} />
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
            <Text style={[props.welcomeFontStyle, styles_.welcomeText]}>{`welcome to ${appName.toUpperCase()}!`}</Text>
            <View style={styles_.contentRow}>
                <TouchableOpacity
                    style={[styles.accountButton, styles_.logoutButton, { marginRight: 5 }]}
                    onPress={() => setAccountOption('signin')}
                    >
                    <Text style={styles_.controlButtonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.accountButton, styles_.logoutButton, { marginLeft: 5 }]}
                    onPress={() => setAccountOption('create')}
                    >
                    <Text style={styles_.controlButtonText}>Create an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const SignInAccount = (props) => {

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [account, setAccount] = useState(null)

    useEffect(() => {
        setAccount({
            id,
            password,
        })
    }, [id, password])

    return (
        <View style={{width: '100%'}}>
            <View>
                <TextInput
                    style={styles_.urlText}
                    onChangeText={text => setId(text)}
                    value={id}
                    placeholder={"screen name"}
                    placeholderTextColor={"white"}
                    />
                <TextInput
                    style={styles_.urlText}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder={"password"}
                    placeholderTextColor={"white"}
                    secureTextEntry={true}
                    />
            </View>
            <View style={styles_.contentRow}>
                <TouchableOpacity
                    style={[styles_.controlButton, {backgroundColor: 'green'}]}
                    onPress={() => props.handleLogin(account)}
                    >
                    <Text style={styles_.controlButtonText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles_.controlButton, {backgroundColor: 'red'}]}
                    onPress={() => props.setAccountOption(undefined)}
                    >
                    <Text style={styles_.controlButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    accountButton: {
        padding: 7,
        paddingLeft: 25,
        paddingRight: 25,
    },
})
