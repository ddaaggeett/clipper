import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import PlaylistVideoOptions from './PlaylistVideoOptions'

export default (props) => {

    const playlist = useSelector(state => state.library.playlist)
    const redux = useDispatch()

    const selectVideo = (item) => {
        redux(actions.updateContentID(item.id))
        redux(actions.selectingFromPlaylist(false))
    }

    const [optionsIndex, setOptionsIndex] = useState(-1)

    const renderItem = ({ item, index }) => {
        if(index != optionsIndex) {
            return(
                <View style={styles.clipItem}>
                    <TouchableOpacity
                        onPress={() => selectVideo(item)}
                        onLongPress={() => setOptionsIndex(index)}
                        >
                        <View style={styles.contentRow}>
                            <Image
                                style={{height:90,width:160}}
                                source={{uri:item.thumbnails.default.url}}
                                />
                            <View style={{flex:1}}>
                                <Text style={[styles.playlistItemText, {color:'white'}]}>{item.title}</Text>
                                <Text style={[styles.playlistItemText, {color:'yellow'}]}>{item.channelTitle}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <View style={styles.clipItem}>
                    <PlaylistVideoOptions
                        item={item}
                        index={index}
                        setOptionsIndex={setOptionsIndex}
                        />
                </View>
            )
        }
    }

    return (
        <View>
            <FlatList
                data={playlist.videos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </View>
    )
}
