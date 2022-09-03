import { useState, useEffect } from 'react'
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import * as Linking from 'expo-linking'
import { appName } from '../../../../config'
import { sourceCodeURL } from '../../../../config'

export const TitleText = () => {

    const [titleText, setTitleText] = useState(`about ${appName}`)
    const { user, webapp } = useSelector(state => state.account)
    const divider = `     ///     `

    useEffect(() => {
        if (user) {
            setTitleText(`${appName}${divider}${user.name}`)
        }
        else setTitleText(`about ${appName}`)
    }, [user])

    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(sourceCodeURL)}
            >
            {
                Platform.OS === 'web'
                ?   <Text style={styles.username}>{titleText}</Text>
                :   <Text style={[styles.username, styles.usernameNative]}>{titleText}</Text>
            }
        </TouchableOpacity>
    )
}

export default () => {

    const { webapp, domain } = useSelector(state => state.account)
    const [fullAppDomain, setFullAppDomain] = useState(domain)

    useEffect(() => {
        if (webapp) setFullAppDomain(`http://${webapp}.${domain}`)
        else setFullAppDomain(domain)
    }, [])

    return <TitleText />
}

const styles = StyleSheet.create({
    username: {
        padding: 7,
        paddingLeft: 28,
        paddingRight: 28,
        color:'white',
    },
    usernameNative: {
        alignSelf: 'center',
        fontSize: 18,
    },

})
