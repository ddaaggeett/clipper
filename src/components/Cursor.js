import {
    View,
    Text,
    TouchableOpacity,
} from "react-native"
import React, {
    useState,
} from 'react'
import { styles } from "../styles"

export default (props) => {

    const [rewindToPause, setRewindToPause] = useState()
    const buttonWidth = props.screenWidth / 5 // divided by bumber of buttons in row

    const setCursorOffset = (seconds) => {
        props.setPlaying(true)
        if(!props.clipInitiated) { // LEFT BOUND CLIP
            const newCursor = props.cursor + seconds
            props.setCursor(newCursor)
            props.playerRef.current.seekTo(newCursor)
        }
        else { // RIGHT BOUND CLIP
            const newCursor = props.cursor + seconds
            props.setCursor(newCursor)
            checkEndBound(newCursor)
        }
    }

    const checkEndBound = (endCursor) => {
        // TODO: This function is terrible. This is the closest I can ge to pausing the video on the right cursor bound without using IFRAME API loadVideoById()
        // TODO:  PAUSE AT END BOUND instead of setTimeout. use API loadVideoById()
        props.setPlaying(true)
        const rewindSeconds = 3
        props.playerRef.current.seekTo(endCursor - rewindSeconds)
        if(props.playing) clearTimeout(rewindToPause)
        props.playerRef.current.getPlaybackRate().then(rate => {
            const pauseTime = rewindSeconds * 1000 / rate
            setRewindToPause(setTimeout(() => {
                props.setPlaying(false)
            }, pauseTime))
        })
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
        <CheckCursor {...props} checkEndBound={checkEndBound} />
        </View>
    )
}

const CheckCursor = (props) => {

    const handleCheckCursor = () => {
        if(!props.clipInitiated) props.playerRef.current.seekTo(props.cursor) // LEFT BOUND CLIP
        else props.checkEndBound(props.cursor) // RIGHT BOUND CLIP
    }

    return (
        <View><TouchableOpacity onPress={() => handleCheckCursor()} style={styles.controlButton}><Text style={styles.controlButtonText}>{"CHECK CURSOR"}</Text></TouchableOpacity></View>
    )
}
