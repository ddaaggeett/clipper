import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "../styles"
import { io } from 'socket.io-client'
import Clip from './Clip'
import { serverIP, socketPort } from '../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import DraggableFlatList from 'react-native-draggable-flatlist'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    const handleReorderedClips = (reorderedClips) => {
        // socket.emit('allClips', reorderedClips, clipsFromServer => {})
        redux(actions.updateClips(reorderedClips))
    }

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

    return (
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
