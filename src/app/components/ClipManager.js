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

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const [clips, setClips] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)

    useFocusEffect( // whenever screen gets focus
        useCallback(() => { // so this suns only once per screen focus
            let isActive = true // suggested by: https://www.debuggr.io/react-update-unmounted-component/
            if (isActive) {
                setSelectedIndex(null)
                getData('clips').then(data => {
                    if(data !== null) setClips(data) // array of clips
                })
            }
            return () => {
                isActive = false
            }
        },[])
    )

    useEffect(() => {
        if (clips !== undefined) {
            storeData('clips', clips)
            socket.emit('clips', clips, received => {
                if(received) console.log('server received all clips')
            })
        }
    },[clips])

    const handleSelect = (index) => {
        setSelectedIndex(index)
    }

    const handleEditClips = (updatedClip, index) => {
        const newClips = clips.slice(0,index).concat(updatedClip).concat(clips.slice(index + 1, clips.length))
        setClips(newClips)
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Clip
                    clip={item}
                    selectedIndex={selectedIndex}
                    index={index}
                    handleSelect={handleSelect}
                    clips={clips}
                    handleEditClips={handleEditClips}
                    />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.clipsList}
                data={clips}
                renderItem={renderItem}
                />
        </View>
    )
}
