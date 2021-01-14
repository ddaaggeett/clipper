import React from 'react'
import {
    ScrollView,
} from 'react-native'
import Clipper from '../components/Clipper'
import VideoSelector from '../components/VideoSelector'
import { styles } from '../styles'

export default () => {
    return (
        <ScrollView  style={[styles.container,{paddingTop:25}]}>
            <Clipper />
            <VideoSelector />
        </ScrollView>
    )
}
