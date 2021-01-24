import React from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native'
import {
    useDispatch,
    useSelector,
} from 'react-redux'
import { styles } from '../styles'
import { setPlaylist } from '../redux/actions/actionCreators'

export default (props) => {

    const playlists = useSelector(state => state.library.playlists)
    const redux = useDispatch()

    const selectPlaylist = (playlist) => {
        redux(setPlaylist(playlist))
        props.navigation.goBack()
    }

    const renderItem = ({ item }) => (
        <View style={styles.clipItem}>
            <TouchableOpacity onPress={() => selectPlaylist({id: item.id, title: item.title})}>
                <View style={{flex:1}}>
                    <Text style={styles.clipItemText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={playlists}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </View>
    )
}
