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

    const selected = props.selectedIndex == props.index
    const clipPlayerHeight = 113

    const [minClipHeight, setMinClipHeight] = useState(null)

    const handleSetClipDimension = ({nativeEvent}) => {
        const punchlineHeight = nativeEvent.layout.height
        if(selected) setMinClipHeight(punchlineHeight + clipPlayerHeight)
        else setMinClipHeight(punchlineHeight)
    }

    const handleEditClipPunchline = (text) => {
        const editedClip = {
            ...props.clip,
            comment: text,
        }
        props.handleEditClips(editedClip, props.index)
    }

    const durationTimeFormat = new Date(props.clip.duration * 1000).toISOString().substr(14, 8)

    return (
        <View style={[styles.clipItem,{height:minClipHeight}]}>
            <TouchableOpacity
                onPress={() => props.handleSelect(props.index)}
                onLongPress={props.drag}
                style={{height:minClipHeight}}
                >
                <View style={styles.contentRow}>
                    <Text style={styles.clipItemText}>{durationTimeFormat}</Text>
                    { !selected
                        ?   null
                        :   <View
                                style={{flex:1}}
                                onLayout={handleSetClipDimension}
                                >
                                <TextInput
                                    style={[styles.clipItemText, styles.punchlineInput]}
                                    multiline={true}
                                    onChangeText={text => handleEditClipPunchline(text)}
                                    value={props.clip.comment}
                                    placeholder={"edit punchline"}
                                    placeholderTextColor={"yellow"}
                                    />
                            </View> }
                    { selected
                        ?   null
                        :   <View style={{flex:1}}>
                                <Text style={styles.clipItemText} onLayout={handleSetClipDimension}>
                                    {props.clip.comment}
                                </Text>
                            </View> }
                </View>
                { !selected
                    ?   null
                    :   <View style={styles.contentRow}>
                            <View style={{position:'absolute',
                            left:0,
                            top:50,}}>
                            <TouchableOpacity style={styles.deleteClip} onPress={() => props.handleDeleteClip(props.index)}>
                                <Text style={styles.clipItemText}>X</Text>
                            </TouchableOpacity>
                            </View>
                            <ClipPlayer clip={props.clip} clipPlayerHeight={clipPlayerHeight} />
                        </View>
                }
            </TouchableOpacity>
        </View>
    )
}

const ClipPlayer = (props) => {

    const playerState = useSelector(state => state.player)
    const player = useRef()
    const [playing, setPlaying] = useState(false)

    return (
        <View style={[styles.clipPlayer, {height:props.clipPlayerHeight}]}>
            <YoutubePlayer
                ref={player}
                play={true}
                height={props.clipPlayerHeight}
                width={200}
                videoId={props.clip.videoId}
                playbackRate={playerState.speed}
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
