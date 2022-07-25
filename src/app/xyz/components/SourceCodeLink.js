import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import * as Linking from 'expo-linking'
import { styles } from '../../clipper/styles'
import { sourceCodeURL } from '../../../../config'

export default () => {
    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(sourceCodeURL)}
            >
            <Image
                source={require('../../../../assets/GitHub-Mark-Light-32px.png')}
                style={[styles.sourceCodeLink, { position: 'fixed' }]}
                />
        </TouchableOpacity>
    )
}
