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
import Clip from './Clip'

export default (props) => {

    const [clips, setClips] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(null)

    useFocusEffect( // whenever screen gets focus
        useCallback(() => { // so this suns only once per screen focus
            getData('clips').then(data => {
                if(data !== null) setClips(data) // array of clips
            })
        },[])
    )

    const handleSelect = (index) => {
        setSelectedIndex(index)
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Clip
                    clip={item}
                    selectedIndex={selectedIndex}
                    index={index}
                    handleSelect={handleSelect}
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
