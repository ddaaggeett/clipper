import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { io } from 'socket.io-client'
import Clip from './Clip'
import { serverIP, socketPort } from '../../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import DraggableFlatList from 'react-native-draggable-flatlist'
import ClipListItem from './ClipListItem'

const socket = io('http://'+ serverIP + ':' + socketPort.clipper)

export default (props) => {

    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    const handleReorderedClips = (reorderedClips) => {
        redux(actions.updateClips(reorderedClips))
        // TODO: pending and fulfill reordered clips
    }

    const renderClipItems = clips.map(clip => {
        return (
            <ClipListItem
                key={clip.timestamp}
                clip={clip}
                index={clips.findIndex(item => item.timestamp === clip.timestamp)}
                />
        )
    })

    const renderItem = ({ item, index, drag }) => {
        return (
            <View>
                <Clip
                    clip={item}
                    index={index}
                    drag={drag}
                    navigation={props.navigation}
                    />
            </View>
        )
    }

    if (Platform.OS === 'web') return (
        <div style={webStyles.clipManager}>
            {renderClipItems}
        </div>
    )
    else return (
        // TODO: https://stackoverflow.com/questions/44743904/virtualizedlist-you-have-a-large-list-that-is-slow-to-update
        <View style={styles.container}>
            <DraggableFlatList
                style={styles.clipsList}
                data={clips}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.key}
                onDragEnd={({ data }) => handleReorderedClips(data)}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
})

const webStyles = {
    clipManager:{
        color:'white'
    },
}
