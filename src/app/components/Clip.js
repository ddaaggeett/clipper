import React, {
    useRef,
    useState,
} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"

export default (props) => {
    return (
        <TouchableOpacity
            style={styles.clipItem}
            onPress={() => props.handleSelect(props.index)}
            >
            <Text style={styles.clipItemText}>{props.clip.id}</Text>
            {
                props.selectedIndex !== props.index
                ?   null
                :   <ClipPlayer clip={props.clip} />
            }
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
