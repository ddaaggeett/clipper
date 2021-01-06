import React, {
    useRef,
    useState,
} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"

export default (props) => {

    const handleEditClipPunchline = (text) => {
        const editedClip = {
            ...props.clip,
            comment: text,
        }
        props.handleEditClips(editedClip, props.index)
    }

    const durationTimeFormat = new Date(props.clip.duration * 1000).toISOString().substr(14, 8)

    return (
        <TouchableOpacity
            style={styles.clipItem}
            onPress={() => props.handleSelect(props.index)}
            onLongPress={props.drag}
            >
            <View>
                { props.selectedIndex !== props.index ? null
                    :   <TextInput
                            style={styles.urlText}
                            onChangeText={text => handleEditClipPunchline(text)}
                            value={props.clip.comment}
                            placeholder={"edit punchline"}
                            placeholderTextColor={"yellow"}
                            /> }
                <Text style={styles.clipItemText}>{durationTimeFormat}</Text>
                { props.selectedIndex == props.index ? null : <Text style={styles.clipItemText}>{props.clip.comment}</Text> }
                { props.selectedIndex !== props.index ? null : <TouchableOpacity style={styles.deleteClip} onPress={() => props.handleDeleteClip(props.index)}><Text style={styles.clipItemText}>X</Text></TouchableOpacity> }
            </View>
            { props.selectedIndex !== props.index ? null : <ClipPlayer clip={props.clip} /> }
        </TouchableOpacity>
    )
}

const ClipPlayer = (props) => {

    const player = useRef()
    const [playing, setPlaying] = useState(false)

    return (
        <View>
            <YoutubePlayer
                ref={player}
                play={true}
                height={113}
                width={200}
                videoId={props.clip.videoId}
                initialPlayerParams={{
                    // TODO: use exact values instead of integers
                    start: Math.floor(props.clip.start),
                    end: Math.ceil(props.clip.end),
                    controls:false,
                }}
                />
        </View>
    )
}
