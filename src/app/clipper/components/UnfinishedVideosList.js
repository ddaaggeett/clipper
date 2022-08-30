import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, Platform, StyleSheet } from 'react-native'
import { serverIP, expressPort } from '../../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { useNavigation } from '@react-navigation/native'

export default (props) => {

    var navigation
    if (Platform.OS !== 'web') navigation = useNavigation()
    const { videoProgressions } = useSelector(state => state.library)
    const redux = useDispatch()

    const selectVideo = (item) => {
        if (Platform.OS !== 'web') navigation.navigate('Clip')
        redux(actions.updateContentID(item.videoID))
    }


    const renderItem = ({ item, index }) => {
        const thumbnailURI = `https://img.youtube.com/vi/${item.videoID}/0.jpg`
        return(
            <View style={styles.clipItem}>
                <TouchableOpacity
                    onPress={() => selectVideo(item)}
                    >
                    <View style={styles.contentRow}>
                        <Image source={{ uri: thumbnailURI }} style={styles.thumbnail} />
                        <View style={{flex: 1}}>
                            {
                                videoProgressions[index].title == undefined
                                ?   <Text style={styles.clipItemText}>{item.videoID}</Text>
                                :   <Text style={styles.clipItemText}>{item.title}</Text>
                            }
                            <Text style={styles.clipItemText}>{item.progress}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    if (videoProgressions.length == 0) return null
    else return (
            <View style={styles.recentVideos}>
                <Text style={styles.recentVideosText}>RECENT VIDEOS</Text>
                <FlatList
                    data={videoProgressions}
                    renderItem={renderItem}
                    keyExtractor={item => item.videoID}
                    />
            </View>
    )
}

const styles = StyleSheet.create({
    contentRow: {
        flexDirection:"row",
    },
    clipItem: {
        backgroundColor:'#222',
        marginBottom: 3,
    },
    clipItemText: {
        flex: 1,
        color: 'white',
        fontSize:16,
        padding:5,
    },
    thumbnail: {
        width: 160,
        height: 90
    },
    recentVideos: {
        borderTopWidth: 7,
        borderColor: 'purple',
        marginTop: 13,
        marginLeft:20,
        marginRight:20,
    },
    recentVideosText: {
        paddingTop: 15,
        paddingBottom: 10,
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
})
