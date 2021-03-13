import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    const handlePlayClip = () => redux(actions.setPlayingClip(true, clips[editIndex].videoId))

    return (
        <View style={styles.contentRow}>
            <TouchableOpacity
                style={styles.controlButton}
                onPress={() => props.handleEditClip()}
                >
                <Text style={styles.controlButtonText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.controlButton, {backgroundColor: 'green'}]}
                onPress={() => handlePlayClip()}
                >
                <Text style={styles.controlButtonText}>PLAY</Text>
            </TouchableOpacity>
        </View>
    )
}
