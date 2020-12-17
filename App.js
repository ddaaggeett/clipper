import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TextInput } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Controls from "./src/Controls"
import { styles } from "./src/styles"
import getContentID from './src/getContentID'

export default function App() {

    const playerRef = useRef()
    const [contentID, setContentID] = useState('')
    const [speed, setSpeed] = useState(1)
    const [clipTime, setClipTime] = useState(0)

    const handleSetSpeed = (speed) => {
        setSpeed(speed)
    }

    const handleRewind = (seconds) => {
        playerRef.current.getCurrentTime().then(time => {
            const seekTime = time - seconds
            setClipTime(seekTime)
            playerRef.current.seekTo(seekTime)
        })
    }

    const handleGetPlayContent = (copiedText) => {
        setContentID(getContentID(copiedText))
    }

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
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
                rewind={handleRewind}
                />
        </View>
    );
}
