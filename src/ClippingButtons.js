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

const CursorShifts = (props) => {

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

const ClipExecute = (props) => {

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
                ? <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"orange"}]} onPress={() => handleRightBound()}><Text style={styles.controlButtonText} >{"CLIP END"}</Text></TouchableOpacity>
                : <TouchableOpacity style={[styles.controlButton, {width:props.buttonWidth, backgroundColor:"green"}]} onPress={() => handleLeftBound()}><Text style={styles.controlButtonText} >{"CLIP START"}</Text></TouchableOpacity>
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
