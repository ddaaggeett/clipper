import React from 'react'
import {
    View,
    Text,
} from "react-native"
import { styles } from "../styles"
import PlaylistSelector from './PlaylistSelector'

export default (props) => {
    return (
        <View style={{marginTop:25, marginBottom:25}}>
            <Text style={{color:'white'}}>settings</Text>
            <PlaylistSelector {...props} />
        </View>
    )
}
