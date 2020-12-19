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
            <ClipToggle {...props} screenWidth={screenWidth} isClipping={isClipping} setIsClipping={handleSetIsClipping} />
            {
                isClipping
                ? <CursorShifts screenWidth={screenWidth} {...props} />
                : null
            }
        </View>
    )
}

const CheckCursor = (props) => {

    const handleCheckCursor = () => {
        props.playFromTime(props.cursor)
    }

    return (
        <View><TouchableOpacity onPress={() => handleCheckCursor()} style={styles.controlButton}><Text style={styles.controlButtonText}>{"CHECK CURSOR"}</Text></TouchableOpacity></View>
    )
}

const CursorShifts = (props) => {

    const buttonWidth = props.screenWidth / 5 // divided by bumber of buttons in row

    return (
        <View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursorOffset(-1)}}><Text style={styles.controlButtonText}>{"<<\n1.00\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursorOffset(-0.25)}}><Text style={styles.controlButtonText}>{"<<\n0.25\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursorOffset(-0.1)}}><Text style={styles.controlButtonText}>{"<<\n0.10\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursorOffset(0.1)}}><Text style={styles.controlButtonText}>{">>\n0.10\nsec"}</Text></TouchableOpacity>
                <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => {props.setCursorOffset(0.25)}}><Text style={styles.controlButtonText}>{">>\n0.25\nsec"}</Text></TouchableOpacity>
            </View>
            <CheckCursor cursor={props.cursor} playFromTime={props.playFromTime} />
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

    const handleInitClipping = () => {
        console.log(props)
        props.setCursorOffset(0)
        props.setIsClipping()
    }

    return (
        <View>
            {
                props.isClipping
                ? <ClipOrCancel {...props} />
                : <TouchableOpacity style={[styles.controlButton, {backgroundColor:"green",}]} onPress={() => handleInitClipping()}><Text style={styles.controlButtonText}>{"START CLIPPING"}</Text></TouchableOpacity>
            }
        </View>

    )
}
