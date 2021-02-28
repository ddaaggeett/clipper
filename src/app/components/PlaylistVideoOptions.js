import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { setPlaylist } from '../redux/actions/actionCreators'

export default (props) => {

    const redux = useDispatch()
    const playlist = useSelector(state => state.library.playlist)

    const buttonWidth = Dimensions.get('window').width/2

    const removeFromPlaylist = () => {
        const newVideoList = playlist.videos.slice(0,props.index).concat(playlist.videos.slice(props.index+1, playlist.videos.length))
        redux(setPlaylist({videos: newVideoList}))
        props.setOptionsIndex(-1)
    }

    return (
        <View style={[styles.contentRow, {height:90}]}>
            <TouchableOpacity
                style={[styles.controlButton,{width:buttonWidth, backgroundColor:'orange'}]}
                onPress={() => removeFromPlaylist(props.item, props.index)}
                >
                <Text style={styles.controlButtonText}>remove from playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.controlButton,{width:buttonWidth, backgroundColor:'red'}]}
                onPress={() => props.setOptionsIndex(-1)}
                >
                <Text style={styles.controlButtonText}>cancel</Text>
            </TouchableOpacity>
        </View>
    )
}
