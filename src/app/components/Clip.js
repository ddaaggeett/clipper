import React, { useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from "../styles"
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import Thumbnail from './Thumbnail'

export default (props) => {

    const redux = useDispatch()

    const durationTimeFormat = new Date(props.clip.duration * 1000).toISOString().substr(14, 8)

    const selectClip = () => {
        redux(actions.setEditIndex(props.index))
        props.navigation.navigate('ClipDetails')
    }

    return (
        <View style={styles.clipItem}>
            <TouchableOpacity
                onPress={() => selectClip()}
                onLongPress={props.drag}
                >
                <View style={styles.contentRow}>
                    <Thumbnail clip={props.clip} />
                    <Text style={styles.clipItemText}>{durationTimeFormat}</Text>
                    <View style={{flex:1}}>
                        <Text style={styles.clipItemText}>
                            {props.clip.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
