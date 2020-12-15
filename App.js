import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function App() {

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    });

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    });

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <YoutubePlayer
                style={styles.player}
                height={playerHeight}
                width={playerWidth}
                play={playing}
                videoId={"aWy5pMx-LLA"}
                onChangeState={onStateChange}
                controls={true}
                />
            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    player: {
        top: 100,
    },
});
