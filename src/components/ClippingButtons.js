import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from "react-native"
import React, {
    useState,
} from 'react'
import { styles } from "../styles"
import ClipExecute from './ClipExecute'
import CursorShifts from './Cursor'

export default (props) => {

    const screenWidth = Dimensions.get('window').width;

    const [toggleClipping, setToggleClipping] = useState(false) // <ClipType/> pressed
    const [clipInitiated, setClipInitiated] = useState(false) // TRUE IF LEFT BOUND EXECUTED <ClipExecute/> pressed

    return (
        <View>
            <ClipToggle {...props} clipInitiated={clipInitiated} setClipInitiated={setClipInitiated} screenWidth={screenWidth} toggleClipping={toggleClipping} setToggleClipping={setToggleClipping} />
            {
                toggleClipping
                ? <CursorShifts clipInitiated={clipInitiated} screenWidth={screenWidth} {...props} />
                : null
            }
        </View>
    )
}

const ClipOrCancel = (props) => {

    const buttonWidth = props.screenWidth / 2 // divided by bumber of buttons in row

    return (
        <View style={styles.buttonRow}>
            <ClipExecute {...props} buttonWidth={buttonWidth} />
            <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]} onPress={() => props.setToggleClipping(!props.toggleClipping)}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
        </View>
    )
}

const ClipType = (props) => {

    const handleClip = () => {
        props.playerRef.current.getCurrentTime().then(time => {
            props.setCursor(time)
        })
        props.setToggleClipping(!props.toggleClipping)
    }

    return(
        <View>
            {
                props.clipInitiated
                ? <TouchableOpacity style={[styles.controlButton, {backgroundColor:"orange",}]} onPress={() => handleClip()}><Text style={styles.controlButtonText}>{"END CLIPPING"}</Text></TouchableOpacity>
                : <TouchableOpacity style={[styles.controlButton, {backgroundColor:"green",}]} onPress={() => handleClip()}><Text style={styles.controlButtonText}>{"START CLIPPING"}</Text></TouchableOpacity>
            }
        </View>
    )
}

const ClipToggle = (props) => {

    return (
        <View>
            {
                props.toggleClipping
                ? <ClipOrCancel {...props} />
                : <ClipType {...props} />
            }
        </View>

    )
}
