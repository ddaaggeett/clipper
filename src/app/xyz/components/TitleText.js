import { useState, useEffect } from 'react'
import { TouchableOpacity, Text, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import * as Linking from 'expo-linking'
import { appName } from '../../../../config'
import { styles } from '../../clipper/styles'
import { sourceCodeURL } from '../../../../config'

export const TitleText = () => {

    const { webapp } = useSelector(state => state.xyz)
    const [titleText, setTitleText] = useState(appName)
    const { loggedIn, user } = useSelector(state => state.account)

    useEffect(() => {
        const fullAppName = webapp != undefined ? `${appName}.${webapp}` : appName
        if (loggedIn) setTitleText(`${fullAppName}     ///     ${user.name}`)
        else setTitleText(fullAppName)
    }, [])

    if(Platform.OS === 'web') return <Text style={styles.username}>{titleText}</Text>
    else return <Text style={[styles.username, styles.usernameNative]}>{titleText}</Text>
}

export default () => {

    const { webapp, domain } = useSelector(state => state.xyz)
    const [fullAppDomain, setFullAppDomain] = useState(domain)

    useEffect(() => {
        if (webapp) setFullAppDomain(`http://${webapp}.${domain}`)
        else setFullAppDomain(domain)
    }, [])

    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(fullAppDomain)}
            style={styles.button}
            >
            <TitleText />
        </TouchableOpacity>
    )
}
