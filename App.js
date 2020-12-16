import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TextInput } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Controls from "./src/Controls"
import { styles } from "./src/styles"

export default function App() {

    const [videoID, setVideoID] = useState('')
    const [speed, setSpeed] = useState(1)

    const handleSetSpeed = (speed) => {
        setSpeed(speed)
    }

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    const getVideoID = (address) => {
        var video_id = ''
        try {
            setVideoID(getYoutubeID(address))
        }
        catch(e) {
            return address
        }
    }

    const getYoutubeID = (address) => {
        if(address.includes(".be/")) { // copied from YouTube mobile app
            var video_id = address.split('.be/')[1]
            return video_id
        }
        else if(address.includes("v=")) { // copied from YouTube bowser site
            var video_id = address.split('v=')[1]
            var cut = video_id.indexOf('&')
            if(cut != -1) {
                video_id = video_id.substring(0, cut)
            }
            return video_id;
        }
        else {
            return null
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <TextInput
                style={styles.urlText}
                onChangeText={text => getVideoID(text)}
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
