import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TextInput } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Controls from "./src/Controls"
import { styles } from "./src/styles"
import getVideoID from './src/getVideoID'

export default function App() {

    const [videoID, setVideoID] = useState('')
    const [speed, setSpeed] = useState(1)

    const handleSetSpeed = (speed) => {
        setSpeed(speed)
    }

    const handleGetVideoID = (copiedText) => {
        setVideoID(getVideoID(copiedText))
    }

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TextInput
                style={styles.urlText}
                onChangeText={text => handleGetVideoID(text)}
                value={videoID}
                placeholder={"paste YouTube address"}
                placeholderTextColor={"white"}
                />
            <YoutubePlayer
                height={playerHeight}
                width={playerWidth}
                play={true}
                onReady={() => this.play=true}
                videoId={videoID}
                playbackRate={speed}
                onPlaybackRateChange={() => this.play=true}
                />
            <Controls speed={speed} setSpeed={handleSetSpeed}/>
        </View>
    );
}
