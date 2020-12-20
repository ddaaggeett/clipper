import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React from 'react'
import { styles } from "../styles"

export default (props) => {

    const buttonWidth = props.screenWidth / 5 // divided by bumber of buttons in row

    const setCursorOffset = (seconds) => {
        if(!props.clipInitiated) { // LEFT BOUND CLIP
            const newCursor = props.cursor + seconds
            props.setCursor(newCursor)
            props.playerRef.current.seekTo(newCursor)
        }
        else { // RIGHT BOUND CLIP
            const newCursor = props.cursor + seconds
            props.setCursor(newCursor)
            props.playerRef.current.seekTo(newCursor - 3)
            // seeks to 3 seconds before
            // TODO:  PAUSE AT END BOUND
        }
    }

    return (
        <View>
        <View style={styles.buttonRow}>
        <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(-1)}><Text style={styles.controlButtonText}>{"<<\n1.00\nsec"}</Text></TouchableOpacity>
        <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(-0.25)}><Text style={styles.controlButtonText}>{"<<\n0.25\nsec"}</Text></TouchableOpacity>
        <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(-0.1)}><Text style={styles.controlButtonText}>{"<<\n0.10\nsec"}</Text></TouchableOpacity>
        <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(0.1)}><Text style={styles.controlButtonText}>{">>\n0.10\nsec"}</Text></TouchableOpacity>
        <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(0.25)}><Text style={styles.controlButtonText}>{">>\n0.25\nsec"}</Text></TouchableOpacity>
        </View>
        <CheckCursor {...props} />
        </View>
    )
}

const CheckCursor = (props) => {

    const handleCheckCursor = () => {
        if(!props.clipInitiated) props.playerRef.current.seekTo(props.cursor) // LEFT BOUND CLIP
        else props.playerRef.current.seekTo(props.cursor - 3) // RIGHT BOUND CLIP
        // seeks to 3 seconds before
        // TODO:  PAUSE AT END BOUND
    }

    return (
        <View><TouchableOpacity onPress={() => handleCheckCursor()} style={styles.controlButton}><Text style={styles.controlButtonText}>{"CHECK CURSOR"}</Text></TouchableOpacity></View>
    )
}
