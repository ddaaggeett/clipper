import React, {
    useState,
    useRef,
    useEffect,
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

    useFocusEffect(() => { // whenever screen gets focus
        getData('clips').then(data => {
            if(data !== null) setClips(data) // array of clips
        })
    },[])

    const renderItem = ({ item }) => (
        <Clip clip={item} />
    )

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
