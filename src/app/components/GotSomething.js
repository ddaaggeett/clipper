import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import React from 'react'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const { gotSomethingCursor } = useSelector(state => state.player)

    const handleGotSomething = () => {
        if(Platform.OS === 'web') redux(actions.setGotSomethingCursor(props.player.current.getCurrentTime()))
        else props.player.current.getCurrentTime().then(time => {
            redux(actions.setGotSomethingCursor(time))
        })
    }

    const handleGotSomethingCancel = () => {
        redux(actions.setGotSomethingCursor(null))
    }

    return (
        <View>
        {
            gotSomethingCursor == null
            ?   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"gray",}]}
                    onPress={() => handleGotSomething()}
                    >
                    <Text style={styles.controlButtonText}>{"GOT SOMETHING"}</Text>
                </TouchableOpacity>
            :   <TouchableOpacity
                    style={[styles.controlButton, {width: props.buttonWidth, backgroundColor:"gray",}]}
                    onPress={() => handleGotSomethingCancel()}
                    >
                    <Text style={styles.controlButtonText}>{"DROP IT"}</Text>
                </TouchableOpacity>
        }
        </View>
    )
}
