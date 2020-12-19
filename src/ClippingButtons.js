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

    const [toggleClipping, setToggleClipping] = useState(false)
    const [clipInitiated, setClipInitiated] = useState(false)

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

const CheckCursor = (props) => {

    const handleCheckCursor = () => {
        if(!props.clipInitiated) props.playFromTime(props.cursor)
        else props.playFromTime(props.cursor - 2) // TODO find good start time to watch til ending cursor stop point
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
            <CheckCursor cursor={props.cursor} playFromTime={props.playFromTime} clipInitiated={props.clipInitiated} />
        </View>
    )
}

const ClipExecute = (props) => {

    const handleClipStart = () => {
        props.setToggleClipping(!props.toggleClipping)
        props.setClipInitiated(!props.clipInitiated)
        props.handleSetClipStart()
    }

    const handleClipEnd = () => {
        props.setToggleClipping(!props.toggleClipping)
        props.setClipInitiated(!props.clipInitiated)
        // TODO
    }

    return (
        <View>
            {
                props.clipInitiated
                ? <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"orange"}]} onPress={() => handleClipEnd()}><Text style={styles.controlButtonText} >{"CLIP END"}</Text></TouchableOpacity>
                : <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"green"}]} onPress={() => handleClipStart()}><Text style={styles.controlButtonText} >{"CLIP START"}</Text></TouchableOpacity>
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

    const handleInitClipping = () => {
        props.setCursorOffset(0)
        props.setToggleClipping(!props.toggleClipping)
    }

    return(
        <View>
            {
                props.clipInitiated
                ? null // TODO
                : <TouchableOpacity style={[styles.controlButton, {backgroundColor:"green",}]} onPress={() => handleInitClipping()}><Text style={styles.controlButtonText}>{"START CLIPPING"}</Text></TouchableOpacity>
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
