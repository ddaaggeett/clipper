import React from 'react'
import {
    View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import { styles } from '../styles'

export default () => {
    return (
        <View  style={[styles.container,{paddingTop:25}]}>
            <StatusBar style="light" />
            <Clipper />
            <VideoSelector />
        </View>
    )
}
