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
import Controls from "./src/components/Controls"
import { styles } from "./src/styles"
import getContentID from './src/getContentID'

export default function App() {

    const playerRef = useRef()
    const [contentID, setContentID] = useState('')
    const [speed, setSpeed] = useState(1)
    const [cursor, setCursor] = useState(0)
    const [leftBound, setLeftBound] = useState(0)
    const [playing, setPlaying] = useState(true)

    const handleSetSpeed = (speed) => {
        setSpeed(speed)
    }

    const handleGetPlayContent = (copiedText) => {
        setContentID(getContentID(copiedText))
    }

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    const handleFinishClip = (rightBound) => {
        setPlaying(true)
        const clipDuration = rightBound - leftBound
        playerRef.current.getVideoUrl().then(videoUrl => {
            const clipObject = {
                start: leftBound,
                duration: clipDuration,
                videoId: getContentID(videoUrl),
            }
        })
        // TODO: socket.io clipObject to server
    }

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
                play={playing}
                onReady={() => setPlaying(true)}
                videoId={contentID}
                playList={contentID}
                playbackRate={speed}
                onPlaybackRateChange={() => setPlaying(true)}
                />
            <Controls
                playerRef={playerRef}
                speed={speed}
                setSpeed={handleSetSpeed}
                cursor={cursor}
                setCursor={setCursor}
                setLeftBound={setLeftBound}
                setRightBound={handleFinishClip}
                playing={playing}
                setPlaying={setPlaying}
                getVideoId={getContentID}
                />
        </View>
    );
}
