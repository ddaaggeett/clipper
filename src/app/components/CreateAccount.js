import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from "../styles"
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const handleCreateAccount = () => {
    }

    return (
        <View style={{width: '100%'}}>
            <Text style={[{margin: 10}, styles.controlButtonText]}>Create an account</Text>
            <TextInput
                style={styles.urlText}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder={"email address"}
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
                    onPress={() => props.setNewAccount(false)}
                    >
                    <Text style={styles.controlButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
