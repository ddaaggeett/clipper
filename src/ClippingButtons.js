import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "./styles"


export default (props) => {
    return (
        <View>
            <TouchableOpacity style={styles.controlButton} onPress={() => {props.setCursor(-1)}}><Text style={styles.controlButtonText}>{"<< 1 s"}</Text></TouchableOpacity>
        </View>
    )
}
