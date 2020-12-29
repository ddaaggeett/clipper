import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "../styles"

export default (props) => {

    const handleLeftBound = () => {
        props.setToggleClipping(!props.toggleClipping)
        props.setClipInitiated(!props.clipInitiated)
        props.setLeftBound(props.cursor)
    }

    const handleRightBound = () => {
        props.setToggleClipping(!props.toggleClipping)
        props.setClipInitiated(!props.clipInitiated)
        props.setRightBound(props.cursor)
    }

    return (
        <View>
            {
                props.clipInitiated
                ? <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"orange"}]} onPress={() => handleRightBound()}><Text style={styles.controlButtonText} >{"CLIP RIGHT"}</Text></TouchableOpacity>
                : <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"green"}]} onPress={() => handleLeftBound()}><Text style={styles.controlButtonText} >{"CLIP LEFT"}</Text></TouchableOpacity>
            }
        </View>
    )
}
