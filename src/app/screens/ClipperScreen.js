import React from 'react'
import {
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import { styles } from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <Clipper />
            <VideoSelector />
        </SafeAreaView>
    )
}
