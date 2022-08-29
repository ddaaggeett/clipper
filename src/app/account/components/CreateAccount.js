import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from "../../clipper/styles"
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

const socket = io('http://'+ serverIP + ':' + socketPort.account)

export default (props) => {

    const redux = useDispatch()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const [newAccountFail, setNewAccountFail] = useState(false)

    const handleCreateAccount = () => {
        if (passwordsMatch) {
            const newUser = {
                id: email,
                email: email,
                name: name,
                password: password1,
            }




            socket.emit('create account', newUser, (account) => {
                if (account) redux(actions.login(account))
                else setNewAccountFail(true)
            })
        }
    }

    useEffect(() => {
        if (password1 === password2) setPasswordsMatch(true)
        else setPasswordsMatch(false)
    }, [password1, password2])

    return (
        <View style={{width: '100%'}}>
            <Text style={[{margin: 10}, styles.controlButtonText]}>Create an account</Text>
            {newAccountFail ? <Text style={{color: 'red', fontWeight: 'bold', fontSize: '18px'}}>{`"${name}" already exists. Try logging into this account instead.`}</Text> : null}
            <TextInput
                style={styles.urlText}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={"email address"}
                placeholderTextColor={"white"}
                />
            <TextInput
                style={styles.urlText}
                onChangeText={text => setName(text)}
                value={name}
                placeholder={"screen name"}
                placeholderTextColor={"white"}
                />
            <TextInput
                style={styles.urlText}
                onChangeText={text => setPassword1(text)}
                value={password1}
                placeholder={"password"}
                placeholderTextColor={"white"}
                secureTextEntry={true}
                />
            <TextInput
                style={styles.urlText}
                onChangeText={text => setPassword2(text)}
                value={password2}
                placeholder={"repeat password"}
                placeholderTextColor={"white"}
                secureTextEntry={true}
                />
            <View style={styles.contentRow}>
                <TouchableOpacity
                    style={[styles.controlButton, {backgroundColor: 'green'}]}
                    onPress={() => handleCreateAccount()}
                    >
                    <Text style={styles.controlButtonText}>Create</Text>
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
