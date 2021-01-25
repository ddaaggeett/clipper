import React, {
    useEffect,
    useState,
} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native'
import { styles } from '../styles'
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import * as AuthSession from 'expo-app-auth'
import * as actions from '../redux/actions/actionCreators'

export default (props) => {

    const playlist = useSelector(state => state.library.playlist)
    const redux = useDispatch()

    const selectVideo = (item) => {
        redux(actions.updateContentID(item.id))
        redux(actions.selectingFromPlaylist(false))
    }

    const renderItem = ({ item }) => (
        <View style={styles.clipItem}>
            <TouchableOpacity onPress={() => selectVideo(item)}>
                <View style={styles.contentRow}>
                    <Image
                        style={{height:90,width:160}}
                        source={{uri:item.thumbnails.default.url}}
                        />
                    <Text style={[styles.clipItemText, {flex:1, flexWrap: "wrap"}]}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

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
