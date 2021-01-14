import React from 'react'
import {
    View,
} from 'react-native'
import { styles } from '../styles'
import Account from '../components/Account'

export default () => {
    return (
        <View  style={[styles.container,{paddingTop:25}]}>
            <Account />
        </View>
    )
}
