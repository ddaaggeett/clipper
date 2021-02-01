import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
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

    return (
        <View>
            <LeftOrRight
                {...props}
                handlingLeft={handlingLeft}
                setHandlingLeft={setHandlingLeft}
                handlingRight={handlingRight}
                setHandlingRight={setHandlingRight}
                />
            <CursorShifts
                {...props}
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
        if(Platform.OS === 'web') props.setLeftCursor(props.player.current.getCurrentTime())
        else props.player.current.getCurrentTime().then(time => {
            props.setLeftCursor(time)
        })
    }

    const handleRightClip = () => {
        props.setHandlingRight(true)
        if(Platform.OS === 'web') props.setRightCursor(props.player.current.getCurrentTime())
        else props.player.current.getCurrentTime().then(time => {
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

    const removeBoundCount = (props) => {
        props.setBoundCount(props.boundCount - 1)
    }

    const handleDeleteLeftClip = () => {
        props.setHandlingLeft(false)
        props.setLeftClipped(false)
        removeBoundCount(props)
    }

    const handleDeleteRightClip = () => {
        props.setHandlingRight(false)
        props.setRightClipped(false)
        removeBoundCount(props)
    }

    if (!props.handlingLeft && !props.handlingRight) {
        return (
            <View style={styles.contentRow}>
                {
                    props.leftClipped
                    ?   <TouchableOpacity
                            style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]}
                            onPress={() => handleDeleteLeftClip()}
                            >
                            <Text style={styles.controlButtonText} >{"DELETE LEFT"}</Text>
                        </TouchableOpacity>
                    :   <TouchableOpacity
                            style={[styles.controlButton, {width: buttonWidth, backgroundColor:"green",}]}
                            onPress={() => handleLeftClip()}
                            >
                            <Text style={styles.controlButtonText}>{"PLACE LEFT"}</Text>
                        </TouchableOpacity>
                }
                {
                    props.rightClipped
                    ?   <TouchableOpacity
                            style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]}
                            onPress={() => handleDeleteRightClip()}
                            >
                            <Text style={styles.controlButtonText} >{"DELETE RIGHT"}</Text>
                        </TouchableOpacity>
                    :   <TouchableOpacity
                            style={[styles.controlButton, {width: buttonWidth, backgroundColor:"orange",}]}
                            onPress={() => handleRightClip()}
                            >
                            <Text style={styles.controlButtonText}>{"PLACE RIGHT"}</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
    else if(props.handlingLeft) {
        return (
            <View style={styles.contentRow}>
                <ExecuteLeft {...props} buttonWidth={buttonWidth} />
                <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]} onPress={() => handleCancelLeft()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
            </View>
        )
    }
    else if(props.handlingRight) {
        return (
            <View style={styles.contentRow}>
                <TouchableOpacity style={[styles.controlButton, {width:buttonWidth, backgroundColor:"red"}]} onPress={() => handleCancelRight()}><Text style={styles.controlButtonText} >{"CANCEL"}</Text></TouchableOpacity>
                <ExecuteRight {...props} buttonWidth={buttonWidth} />
            </View>
        )
    }
}
