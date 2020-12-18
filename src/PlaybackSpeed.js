import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React, {
} from 'react'
import { styles } from "./styles"

export default (props) => {
    return (
        <View>
            {
                props.speed === 1
                ? <TouchableOpacity style={styles.controlButton} onPress={() => {props.setSpeed(2)}}><Text style={styles.controlButtonText}>{"x 2.0"}</Text></TouchableOpacity>
                : <TouchableOpacity style={styles.controlButton} onPress={() => {props.setSpeed(1)}}><Text style={styles.controlButtonText}>{"x 1.0"}</Text></TouchableOpacity>
            }
        </View>
    )
}
