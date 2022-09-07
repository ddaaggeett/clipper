import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { serverIP, expressPort } from '../../../config'
import Collaboration from '../collaboration/web'

export default () => {
    return <Collaboration />
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
