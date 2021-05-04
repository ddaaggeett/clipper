import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { styles } from '../styles'
import { serverIP, expressPort } from '../../../config'
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
        const thumbnailURI = `http://${serverIP}:${expressPort}/${item.videoId}/${item.videoId}.png`
        return(
            <View style={styles.clipItem}>
                <TouchableOpacity
                    onPress={() => selectVideo(item)}
                    >
                    <View style={styles.contentRow}>
                        <Image source={{ uri: thumbnailURI }} style={styles.thumbnail} />
                        <View>
                            <Text style={styles.clipItemText}>{item.videoId}</Text>
                            <Text style={styles.clipItemText}>{item.progress}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    if (videoProgressions.length == 0) return null
    else return (
        <View>
            <View style={styles.recentVideos}>
                <Text style={styles.recentVideosText}>RECENT VIDEOS</Text>
                <FlatList
                    data={videoProgressions}
                    renderItem={renderItem}
                    keyExtractor={item => item.videoId}
                    />
            </View>
        </View>
    )
}
