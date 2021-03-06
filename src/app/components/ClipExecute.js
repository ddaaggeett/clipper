import { View, Text, TouchableOpacity } from "react-native"
import React from 'react'
import { styles } from "../styles"
import GotSomething from './GotSomething'

const addBoundCount = (props) => {
    props.setBoundCount(props.boundCount + 1)
}

export const ExecuteLeft = (props) => {

    const handleExecuteLeft = () => {
        props.setLeftClipped(true)
        addBoundCount(props)
        props.setHandlingLeft(false)
    }

    const handleCancelLeft = () => {
        props.setHandlingLeft(false)
        props.setPlaying(true)
    }

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"green"}]} onPress={() => handleExecuteLeft()}><Text style={styles.controlButtonText} >{"EXECUTE LEFT"}</Text></TouchableOpacity>
            <GotSomething {...props} />
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"red"}]} onPress={() => handleCancelLeft()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
        </View>
    )
}

export const ExecuteRight = (props) => {

    const handleExecuteRight = () => {
        props.setRightClipped(true)
        addBoundCount(props)
        props.setHandlingRight(false)
    }

    const handleCancelRight = () => {
        props.setHandlingRight(false)
        props.setPlaying(true)
    }

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"red"}]} onPress={() => handleCancelRight()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
            <GotSomething {...props} />
            <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"orange"}]} onPress={() => handleExecuteRight()}><Text style={styles.controlButtonText} >{"EXECUTE RIGHT"}</Text></TouchableOpacity>
        </View>
    )
}
