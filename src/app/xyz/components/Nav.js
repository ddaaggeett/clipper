import { useEffect, useState } from 'react'
import { StyleSheet } from "react-native"
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import * as actions from '../../redux/actions/actionCreators'
import { webapps } from '../../web'

export default () => {
    return (
        <View style={styles.appnav}>
            <AppButtons />
        </View>
    )
}

const AppButtons = () => {
    const { webapp, domain } = useSelector(state => state.xyz)

    return (
        <View>
        {
            webapps.map((app, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(`http://${app.name}.${domain}`)}
                        style={styles.button}
                        >
                        <Text style={styles.linkText}>{app.name}</Text>
                    </TouchableOpacity>
                )
            })
        }
        </View>
    )
}


export const styles = StyleSheet.create({
    linkText: {
        color: 'white',
    },
    appnav: {
        margin: 100,
    },
    button: {
        backgroundColor: '#222',
        borderColor: 'green',
        borderWidth: 2,
        padding: 15,
        margin: 5,
    },
})
