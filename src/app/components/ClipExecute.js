import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "../styles"

const addBoundCount = (props) => {
    props.setBoundCount(props.boundCount + 1)
}

export const ExecuteLeft = (props) => {

    const handleExecuteLeft = () => {
        addBoundCount(props)
        props.setHandlingLeft(false)
    }

    return (
        <View>
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"green"}]} onPress={() => handleExecuteLeft()}><Text style={styles.controlButtonText} >{"EXECUTE LEFT"}</Text></TouchableOpacity>
        </View>
    )
}

export const ExecuteRight = (props) => {

    const handleExecuteRight = () => {
        addBoundCount(props)
        props.setHandlingRight(false)
    }

    return (
        <View>
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"orange"}]} onPress={() => handleExecuteRight()}><Text style={styles.controlButtonText} >{"EXECUTE RIGHT"}</Text></TouchableOpacity>
        </View>
    )
}
