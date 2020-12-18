import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from "react-native"
import React, {
    useState,
} from 'react'
import { styles } from "./styles"

export default (props) => {

    const screenWidth = Dimensions.get('window').width;

    const [isClipping, setIsClipping] = useState(false)

    const handleSetIsClipping = () => {
        setIsClipping(!isClipping)
    }

    return (
        <View>
            <ClipToggle screenWidth={screenWidth} isClipping={isClipping} setIsClipping={handleSetIsClipping} />
            {
                isClipping
                ? <CursorShifts screenWidth={screenWidth} {...props} />
                : null
            }
        </View>
    )
}

const CursorShifts = (props) => {

    const buttonWidth = props.screenWidth / 2 // divided by bumber of buttons in row

    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursor(-1)}}><Text style={styles.controlButtonText}>{"<< 1 s"}</Text></TouchableOpacity>
            <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursor(-1)}}><Text style={styles.controlButtonText}>{"<< 1 s"}</Text></TouchableOpacity>
        </View>
    )
}

const ClipOrCancel = (props) => {

    const buttonWidth = props.screenWidth / 2 // divided by bumber of buttons in row

    return (
        <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"green"}]} onPress={{/*TODO*/}}><Text style={styles.controlButtonText} >{"CLIP"}</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]} onPress={() => props.setIsClipping()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
        </View>
    )
}

const ClipToggle = (props) => {
    return (
        <View>
            {
                props.isClipping
                ? <ClipOrCancel {...props} />
                : <TouchableOpacity style={styles.controlButton} onPress={() =>  props.setIsClipping()}><Text style={styles.controlButtonText}>{"START CLIPPING"}</Text></TouchableOpacity>
            }
        </View>

    )
}
