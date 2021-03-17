import React, { useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import { styles } from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {

    const { boundCount } = useSelector(state => state.app)
    const [pendingTitle, setPendingTitle] = useState('')

    useEffect(() => {
        if (boundCount == 0) setPendingTitle('')
    }, [boundCount])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Clipper pendingTitle={pendingTitle} />
            <VideoSelector />
            <TextInput
                style={[styles.clipItemText, styles.titleInput]}
                onChangeText={text => setPendingTitle(text)}
                value={pendingTitle}
                placeholder={"PENDING TITLE"}
                placeholderTextColor={"yellow"}
                />
        </SafeAreaView>
    )
}
