import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native"
import React from 'react'
import { styles } from "../styles"
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import Playlist from './Playlist'
import * as actions from '../redux/actions/actionCreators'
import getContentID from '../getContentID'

export default (props) => {

    const contentID = useSelector(state => state.player.contentID)
    const playlist = useSelector(state => state.library.playlist)
    const selectingFromPlaylist = useSelector(state => state.library.selectingFromPlaylist)
    const redux = useDispatch()

    const handleGetPlayContent = (text) => {
        redux(actions.updateContentID(getContentID(text)))
    }

    const selectFromPlaylist = () => {
        redux(actions.selectingFromPlaylist(true))
    }

    const cancelSelectFromPlaylist = () => {
        redux(actions.selectingFromPlaylist(false))
    }

    return (
        <View>
        {
            selectingFromPlaylist
            ?   <View>
                    <TouchableOpacity style={[styles.controlButton, {backgroundColor:'red'}]} onPress={() => cancelSelectFromPlaylist()}>
                        <Text style={styles.controlButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <Playlist />
                </View>
            :   <View>
                    <TextInput
                        style={[styles.urlText, {marginTop: 25, marginBottom:25}]}
                        onChangeText={text => handleGetPlayContent(text)}
                        value={contentID}
                        placeholder={"paste YouTube address"}
                        placeholderTextColor={"white"}
                        />
                    <TouchableOpacity style={styles.controlButton} onPress={() => selectFromPlaylist()}>
                        <Text style={styles.controlButtonText}>{`select from ${playlist.title}`}</Text>
                    </TouchableOpacity>
                </View>
        }
        </View>
    )
}
