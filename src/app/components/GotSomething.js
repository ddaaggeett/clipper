import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import React from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const { gotSomethingCursor } = useSelector(state => state.app)

    const handleGotSomething = () => {
        if(Platform.OS === 'web') redux(actions.setGotSomethingCursor(props.player.current.getCurrentTime()))
        else props.player.current.getCurrentTime().then(time => {
            redux(actions.setGotSomethingCursor(time))
        })
    }

    return (
        gotSomethingCursor == null
        ?   <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleGotSomething()}
                >
                <Text style={styles.controlButtonText}>{"GOT\nSOMETHING"}</Text>
            </TouchableOpacity>
        :   <RewindOrCancel {...props} />
    )
}

const RewindOrCancel = (props) => {

    const redux = useDispatch()
    const { rightClipped, boundCount, gotSomethingCursor } = useSelector(state => state.app)

    const handleGotSomethingCancel = () => redux(actions.setGotSomethingCursor(null))

    return (
        rightClipped && boundCount == 1
        ?   <TouchableOpacity
                style={[styles.controlButton, {backgroundColor:"#440075"}]}
                onPress={() => props.setGotSomethingCursorOffset()}
                >
                <Text style={styles.controlButtonText}>{"<< 10\nsec"}</Text>
            </TouchableOpacity>
        :   <TouchableOpacity
                style={[styles.controlButton, {backgroundColor:"#440075"}]}
                onPress={() => handleGotSomethingCancel()}
                >
                <Text style={styles.controlButtonText}>{"DROP\nIT"}</Text>
            </TouchableOpacity>
    )
}
