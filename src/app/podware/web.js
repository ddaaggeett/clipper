import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { serverIP, expressPort } from '../../../config'
const { initPodware } = require('./hooks')

export default () => {

    initPodware()

    return (
        <View>
        <Text style={styles.text}>{`podware application`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    text: {
        color: 'white',
    },
})
