import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styles } from "../styles"

export default (props) => {

    const speed = useSelector(state => state.player.speed)

    const [rewindToPause, setRewindToPause] = useState()
    const buttonWidth = props.screenWidth / 5 // divided by number of buttons in row

    const setCursorOffset = (seconds) => {
        props.setPlaying(true)
        if(props.handlingLeft) {
            const newCursor = props.leftCursor + seconds
            props.setLeftCursor(newCursor)
            props.player.current.seekTo(newCursor)
        }
        else if (props.handlingRight){
            const newCursor = props.rightCursor + seconds
            props.setRightCursor(newCursor)
            checkEndBound(newCursor)
        }
    }

    const checkEndBound = (endCursor) => {
        // TODO: This function is terrible. This is the closest I can ge to pausing the video on the right cursor bound without using IFRAME API loadVideoById()
        // TODO:  PAUSE AT END BOUND instead of setTimeout. use API loadVideoById()
        props.setPlaying(true)
        const rewindSeconds = 3
        props.player.current.seekTo(endCursor - rewindSeconds)
        if(props.playing) clearTimeout(rewindToPause)
        const pauseTime = rewindSeconds * 1000 / speed
        setRewindToPause(setTimeout(() => {
            props.setPlaying(false)
        }, pauseTime))
    }

    if(props.handlingLeft || props.handlingRight) {
        return (
            <View>
                <View style={styles.contentRow}>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(-1)}><Text style={styles.controlButtonText}>{"<<\n1.00\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(-0.25)}><Text style={styles.controlButtonText}>{"<<\n0.25\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(-0.1)}><Text style={styles.controlButtonText}>{"<<\n0.10\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(0.1)}><Text style={styles.controlButtonText}>{">>\n0.10\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton]} onPress={() => setCursorOffset(0.25)}><Text style={styles.controlButtonText}>{">>\n0.25\nsec"}</Text></TouchableOpacity>
                </View>
                <CheckCursor {...props} checkEndBound={checkEndBound} />
            </View>
        )
    }
    else return null
}

const CheckCursor = (props) => {

    const handleCheckCursor = () => {
        if(props.handlingLeft) props.player.current.seekTo(props.leftCursor)
        else if(props.handlingRight) props.checkEndBound(props.rightCursor)
    }

    return (
        <View><TouchableOpacity onPress={() => handleCheckCursor()} style={styles.controlButton}><Text style={styles.controlButtonText}>{"CHECK CURSOR"}</Text></TouchableOpacity></View>
    )
}
