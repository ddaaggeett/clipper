import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const { videoProgressions } = useSelector(state => state.library)
    const redux = useDispatch()

    const selectVideo = (item) => {
        redux(actions.updateContentID(item.videoId))
        redux(actions.selectingUnfinishedVideo(false))
    }

    const renderItem = ({ item, index }) => {
        return(
            <View style={styles.clipItem}>
                <TouchableOpacity
                    onPress={() => selectVideo(item)}
                    >
                    <Text style={styles.clipItemText}>{item.videoId}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <FlatList
            data={videoProgressions}
            renderItem={renderItem}
            keyExtractor={item => item.videoId}
            />
    )
}
