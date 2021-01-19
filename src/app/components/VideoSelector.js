import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "../styles"
import {
    useSelector,
} from 'react-redux'
import Playlist from './Playlist'

export default () => {

    const library = useSelector(state => state.player.library)
    return (
        <View>
            <Text style={{color:'white'}}>Video selector</Text>
            <Playlist />
        </View>
    )
}
