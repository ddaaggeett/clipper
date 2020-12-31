import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "../styles"

export const ExecuteLeft = (props) => {

    const handleExecuteLeft = () => {
        props.setLeftCursor(props.leftCursor)
    }

    return (
        <View>
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"green"}]} onPress={() => handleExecuteLeft()}><Text style={styles.controlButtonText} >{"EXECUTE LEFT"}</Text></TouchableOpacity>
        </View>
    )
}

export const ExecuteRight = (props) => {

    const handleExecuteRight = () => {
        props.setRightCursor(props.rightCursor)
    }

    return (
        <View>
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"orange"}]} onPress={() => handleExecuteRight()}><Text style={styles.controlButtonText} >{"EXECUTE RIGHT"}</Text></TouchableOpacity>
        </View>
    )
}
