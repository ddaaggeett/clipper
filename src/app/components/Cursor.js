import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from "../styles"
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const { leftCursor, rightCursor, handlingLeft, handlingRight, speed } = useSelector(state => state.app)

    const [rewindToPause, setRewindToPause] = useState()
    const buttonWidth = props.screenWidth / 5 // divided by number of buttons in row

    const setCursorOffset = (seconds) => {
        props.setPlaying(true)
        if(handlingLeft) {
            const newCursor = leftCursor + seconds
            redux(actions.setLeftCursor(newCursor))
            props.player.current.seekTo(newCursor)
        }
        else if (handlingRight){
            const newCursor = rightCursor + seconds
            redux(actions.setRightCursor(newCursor))
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

    if(handlingLeft || handlingRight) {
        return (
            <View>
                <View style={styles.contentRow}>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton, {backgroundColor: '#440075'}]} onPress={() => setCursorOffset(-1)}><Text style={styles.controlButtonText}>{"<<\n1.00\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton, {backgroundColor: '#2d004e'}]} onPress={() => setCursorOffset(-0.25)}><Text style={styles.controlButtonText}>{"<<\n0.25\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton, {backgroundColor: '#17027'}]} onPress={() => setCursorOffset(-0.1)}><Text style={styles.controlButtonText}>{"<<\n0.10\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton, {backgroundColor: '#17027'}]} onPress={() => setCursorOffset(0.1)}><Text style={styles.controlButtonText}>{">>\n0.10\nsec"}</Text></TouchableOpacity>
                    <TouchableOpacity style={[{width:buttonWidth}, styles.controlButton, {backgroundColor: '#2d004e'}]} onPress={() => setCursorOffset(0.25)}><Text style={styles.controlButtonText}>{">>\n0.25\nsec"}</Text></TouchableOpacity>
                </View>
                <CheckCursor {...props} checkEndBound={checkEndBound} />
            </View>
        )
    }
    else return null
}

const CheckCursor = (props) => {

    const handleCheckCursor = () => {
        if(handlingLeft) props.player.current.seekTo(leftCursor)
        else if(handlingRight) props.checkEndBound(rightCursor)
    }

    return (
        <View><TouchableOpacity onPress={() => handleCheckCursor()} style={[styles.controlButton, {backgroundColor: 'black'}]}><Text style={styles.controlButtonText}>{"CHECK CURSOR"}</Text></TouchableOpacity></View>
    )
}
