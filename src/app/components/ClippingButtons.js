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
import {
    ExecuteLeft,
    ExecuteRight,
} from './ClipExecute'
import CursorShifts from './Cursor'

export default (props) => {

    const [handlingLeft, setHandlingLeft] = useState(false)
    const [handlingRight, setHandlingRight] = useState(false)

    const screenWidth = Dimensions.get('window').width;

    return (
        <View>
            <LeftOrRight
                {...props}
                handlingLeft={handlingLeft}
                setHandlingLeft={setHandlingLeft}
                handlingRight={handlingRight}
                setHandlingRight={setHandlingRight}
                screenWidth={screenWidth}
                />
            <CursorShifts
                {...props}
                screenWidth={screenWidth}
                handlingLeft={handlingLeft}
                handlingRight={handlingRight}
                />
        </View>
    )
}

const LeftOrRight = (props) => {


    const buttonWidth = props.screenWidth / 2 // divided by bumber of buttons in row

    const handleLeftClip = () => {
        props.setHandlingLeft(true)
        props.player.current.getCurrentTime().then(time => {
            props.setLeftCursor(time)
        })
    }

    const handleRightClip = () => {
        props.setHandlingRight(true)
        props.player.current.getCurrentTime().then(time => {
            props.setRightCursor(time)
        })
    }

    const handleCancelLeft = () => {
        props.setHandlingLeft(false)
        props.setPlaying(true)
    }

    const handleCancelRight = () => {
        props.setHandlingRight(false)
        props.setPlaying(true)
    }

    if (!props.handlingLeft && !props.handlingRight) {
        return (
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.controlButton, {width: buttonWidth, backgroundColor:"green",}]} onPress={() => handleLeftClip()}><Text style={styles.controlButtonText}>{"PLACE START"}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {width: buttonWidth, backgroundColor:"orange",}]} onPress={() => handleRightClip()}><Text style={styles.controlButtonText}>{"PLACE END"}</Text></TouchableOpacity>
            </View>
        )
    }
    else if(props.handlingLeft) {
        return (
            <View style={styles.buttonRow}>
                <ExecuteLeft {...props} buttonWidth={buttonWidth} />
                <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]} onPress={() => handleCancelLeft()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
            </View>
        )
    }
    else if(props.handlingRight) {
        return (
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]} onPress={() => handleCancelRight()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
                <ExecuteRight {...props} buttonWidth={buttonWidth} />
            </View>
        )
    }
}
