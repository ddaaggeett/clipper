import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
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
        socket.emit('clips', clips, received => {
            if(received) console.log('server received all clips')
        })
        setClipsDrag(clips.map((clip, index) => ({
            ...clip,
            key: clip.id
        })))
    },[clips])

    const handleSelect = (index) => {
        setSelectedIndex(index)
    }

    const handleEditClips = (updatedClip, index) => {
        const newClips = clips.slice(0,index).concat(updatedClip).concat(clips.slice(index + 1, clips.length))
        redux(updateClips(newClips))
    }

    const handleDeleteClip = (index) => {
        // TODO: whether to delete clip on server as well?
        const newClips = clips.slice(0,index).concat(clips.slice(index + 1, clips.length))
        redux(updateClips(newClips))
        setSelectedIndex(null)
    }

    const renderItem = ({ item, index, drag }) => {
        return (
            <View>
                <Clip
                    clip={item}
                    selectedIndex={selectedIndex}
                    index={index}
                    handleSelect={handleSelect}
                    handleEditClips={handleEditClips}
                    handleDeleteClip={handleDeleteClip}
                    drag={drag}
                    />
            </View>
        )
    }

    const KeyboardSpacer = () => { // TODO: use KeyboardAvoidingView instead
        return (
            <View style={{height:250}} />
        )
    }

    return (// null )
        <View style={styles.container}>
            <DraggableFlatList
                style={styles.clipsList}
                data={clipsDrag}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.key}
                onDragEnd={({ data }) => redux(updateClips(data))}
                ListFooterComponent={<KeyboardSpacer />}
                />
        </View>
    )
}
