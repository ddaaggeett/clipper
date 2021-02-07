import React, { useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from "../styles"
import { useSelector } from 'react-redux'

export default (props) => {

    const durationTimeFormat = new Date(props.clip.duration * 1000).toISOString().substr(14, 8)

    const selectClip = () => {
        props.navigation.navigate('ClipDetails', {
            index: props.index,
        })
    }

    return (
        <View style={styles.clipItem}>
            <TouchableOpacity
                onPress={() => selectClip()}
                onLongPress={props.drag}
                >
                <View style={styles.contentRow}>
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
