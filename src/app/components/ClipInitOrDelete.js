import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import React from 'react'
import { styles } from "../styles"

export const ClipInitOrDeleteLeft = (props) => {

    const handleLeftClip = () => {
        props.setHandlingLeft(true)
        if(Platform.OS === 'web') props.setLeftCursor(props.player.current.getCurrentTime())
        else props.player.current.getCurrentTime().then(time => {
            props.setLeftCursor(time)
        })
    }

    const handleDeleteLeftClip = () => {
        props.setHandlingLeft(false)
        props.setLeftClipped(false)
        props.removeBoundCount(props)
    }

    return (
        <View>
        {
            props.leftClipped
            ?   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"red"}]}
                    onPress={() => handleDeleteLeftClip()}
                    >
                    <Text style={styles.controlButtonText} >{"DELETE LEFT"}</Text>
                </TouchableOpacity>
            :   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"green",}]}
                    onPress={() => handleLeftClip()}
                    >
                    <Text style={styles.controlButtonText}>{"PLACE LEFT"}</Text>
                </TouchableOpacity>
        }
        </View>
    )
}

export const ClipInitOrDeleteRight = (props) => {

    const handleRightClip = () => {
        props.setHandlingRight(true)
        if(Platform.OS === 'web') props.setRightCursor(props.player.current.getCurrentTime())
        else props.player.current.getCurrentTime().then(time => {
            props.setRightCursor(time)
        })
    }

    const handleDeleteRightClip = () => {
        props.setHandlingRight(false)
        props.setRightClipped(false)
        props.removeBoundCount(props)
    }

    return (
        <View>
        {
            props.rightClipped
            ?   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"red"}]}
                    onPress={() => handleDeleteRightClip()}
                    >
                    <Text style={styles.controlButtonText} >{"DELETE RIGHT"}</Text>
                </TouchableOpacity>
            :   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"orange",}]}
                    onPress={() => handleRightClip()}
                    >
                    <Text style={styles.controlButtonText}>{"PLACE RIGHT"}</Text>
                </TouchableOpacity>
        }
        </View>
    )
}
