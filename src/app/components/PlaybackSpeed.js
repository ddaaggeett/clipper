import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React, {
} from 'react'
import { styles } from "../styles"

export default (props) => {

    const buttonWidth = props.screenWidth / 3 // divided by bumber of buttons in row

    const selectedSpeed = (speed) => {
        if (speed == props.speed) return "black"
        else return "purple"
    }

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity style={[styles.controlButton, {width: buttonWidth, backgroundColor: selectedSpeed(1)}]} onPress={() => {props.setSpeed(1)}}><Text style={styles.controlButtonText}>{"x 1.0"}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {width: buttonWidth, backgroundColor: selectedSpeed(1.5)}]} onPress={() => {props.setSpeed(1.5)}}><Text style={styles.controlButtonText}>{"x 1.5"}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {width: buttonWidth, backgroundColor: selectedSpeed(2)}]} onPress={() => {props.setSpeed(2)}}><Text style={styles.controlButtonText}>{"x 2.0"}</Text></TouchableOpacity>
        </View>
    )
}
