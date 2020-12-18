import { StatusBar } from 'expo-status-bar';
import React, {
    useState,
    useRef,
} from 'react';
import { StyleSheet,
    View,
    Button,
    Dimensions,
    TextInput,
    NativeModules,
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Controls from "./src/Controls"
import { styles } from "./src/styles"
import getContentID from './src/getContentID'

export default function App() {

    const playerRef = useRef()
    const [contentID, setContentID] = useState('')
    const [speed, setSpeed] = useState(1)
    const [cursor, setCursor] = useState(0)

    const handleSetSpeed = (speed) => {
        setSpeed(speed)
    }

    const handleSetCursor = (seconds) => {
        playerRef.current.getCurrentTime().then(time => {
            const cursorTime = time + seconds
            setCursor(cursorTime)
            playerRef.current.seekTo(cursorTime)
        })
    }

    const handleGetPlayContent = (copiedText) => {
        setContentID(getContentID(copiedText))
    }

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <TextInput
                style={styles.urlText}
                onChangeText={text => handleGetPlayContent(text)}
                value={contentID}
                placeholder={"paste YouTube address"}
                placeholderTextColor={"white"}
                />
            <YoutubePlayer
                ref={playerRef}
                height={playerHeight}
                width={playerWidth}
                play={true}
                onReady={() => this.play=true}
                videoId={contentID}
                playList={contentID}
                playbackRate={speed}
                onPlaybackRateChange={() => playerRef.current.play=true}
                />
            <Controls
                speed={speed}
                setSpeed={handleSetSpeed}
                setCursor={handleSetCursor}
                />
        </View>
    );
}
