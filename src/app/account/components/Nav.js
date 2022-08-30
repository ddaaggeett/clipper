import { useEffect, useState } from 'react'
import { StyleSheet } from "react-native"
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import * as actions from '../redux/actions/actionCreators'
import { apps } from '../../../../config'

export default () => {
    const { webapp, domain } = useSelector(state => state.account)

    return (
        <View style={styles.appnav}>
        {
            apps.map((app, index) => {
                if (app.name !== 'account') return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(`http://${app.name}.${domain}`)}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>{app.name}</Text>
                    </TouchableOpacity>
                )
            })
        }
        </View>
    )
}

const styles = StyleSheet.create({
    appnav: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 100,
        marginLeft: 100,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
    },
    buttonText: {
        color: 'white',
    },
})
