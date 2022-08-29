import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as Linking from 'expo-linking'
import { sourceCodeURL } from '../../../../config'

export default () => {
    return (
        <TouchableOpacity
            onPress={() => Linking.openURL(sourceCodeURL)}
            >
            <Image
                source={require('../../../../assets/GitHub-Mark-Light-32px.png')}
                style={styles.sourceCodeLink}
                />
        </TouchableOpacity>
    )
}

export const styles = StyleSheet.create({
    sourceCodeLink: {
        height: 20,
        width: 20,
        margin: 8,
    },
})
