import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    storeData,
    getData,
} from '../storage'
import { styles } from "../styles"
import { useFocusEffect } from '@react-navigation/native'
import { io } from 'socket.io-client'
import Clip from './Clip'
import {
    serverIP,
    port,
} from '../../../config'
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import { updateClips } from '../redux/actions/actionCreators'
import DraggableFlatList from 'react-native-draggable-flatlist'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const clips = useSelector(state => state.clips)
    const redux = useDispatch()
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [clipsDrag, setClipsDrag] = useState([])

    useFocusEffect( // whenever screen gets focus
        useCallback(() => { // so this suns only once per screen focus
            return () => {
                setSelectedIndex(null) // when focus is lost
            }
        },[])
    )

    useEffect(() => {
        setClipsDrag(clips.map((clip, index) => ({
            ...clip,
            key: clip.id
        })))
        socket.emit('allClips', clips, received => {
            if(received) console.log('server received all clips')
        })
    },[clips])

    const handleReorderedClips = (data) => {
        redux(updateClips(data))
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
                data={clipsDrag}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.key}
                onDragEnd={({ data }) => handleReorderedClips(data)}
                />
        </View>
    )
}
