import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { serverIP, expressPort } from '../../../config'

export default () => {
    return <Text style={styles.text}>podware web app</Text>
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
