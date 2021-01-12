import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React, {
    useState,
} from 'react'
import { styles } from "../styles"

export default (props) => {

    const clip = props.route.params.clip

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.controlButton} onPress={() => props.navigation.goBack()}>
                <Text style={styles.controlButtonText}>save clip</Text>
            </TouchableOpacity>
            <Text style={{color:'white'}}>{JSON.stringify(clip, null, 4)}</Text>
        </View>
    )
}
