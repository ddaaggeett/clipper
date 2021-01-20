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
    const redux = useDispatch()

    const handleGetPlayContent = (text) => {
        redux(actions.updateContentID(getContentID(text)))
    }

    return (
        <View style={{marginTop:25, marginBottom:25}}>
            <TextInput
                style={[styles.urlText, {marginBottom:25}]}
                onChangeText={text => handleGetPlayContent(text)}
                value={contentID}
                placeholder={"paste YouTube address"}
                placeholderTextColor={"white"}
                />
            <Playlist />
        </View>
    )
}
