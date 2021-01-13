import React, {
    useRef,
    useState,
} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"
import {
    useSelector,
} from 'react-redux'

export default (props) => {

    const [minClipHeight, setMinClipHeight] = useState(null)

    const handleSetClipDimension = ({nativeEvent}) => {
        setMinClipHeight(nativeEvent.layout.height)
    }

    const comment = props.clip.comment

    const durationTimeFormat = new Date(props.clip.duration * 1000).toISOString().substr(14, 8)

    const selectClip = () => {
        props.navigation.navigate('ClipDetails', {
            index: props.index,
        })
    }

    return (
        <View style={[styles.clipItem,{height:minClipHeight}]}>
            <TouchableOpacity
                onPress={() => selectClip()}
                onLongPress={props.drag}
                style={{height:minClipHeight}}
                >
                <View style={styles.contentRow}>
                    <Text style={styles.clipItemText}>{durationTimeFormat}</Text>
                    <View style={{flex:1}}>
                        <Text style={styles.clipItemText} onLayout={handleSetClipDimension}>
                            {comment}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
