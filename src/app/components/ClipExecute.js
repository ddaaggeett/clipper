import { View, Text, TouchableOpacity } from "react-native"
import React from 'react'
import { styles } from "../styles"
import { useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import GotSomething from './GotSomething'

const addBoundCount = (props) => {
    props.setBoundCount(props.boundCount + 1)
}

export const ExecuteLeft = (props) => {

    const redux = useDispatch()

    const handleExecuteLeft = () => {
        redux(actions.setLeftClipped(true))
        addBoundCount(props)
        redux(actions.setHandlingLeft(false))
    }

    const handleCancelLeft = () => {
        redux(actions.setHandlingLeft(false))
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

    const redux = useDispatch()

    const handleExecuteRight = () => {
        if (props.boundCount + 1 == 1) props.setGotSomethingCursorOffset()
        redux(actions.setRightClipped(true))
        addBoundCount(props)
        redux(actions.setHandlingRight(false))
    }

    const handleCancelRight = () => {
        redux(actions.setHandlingRight(false))
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
