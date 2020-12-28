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
import { io } from 'socket.io-client'
import {
    storeData,
    getData,
} from './src/appData'
import {
    serverIP,
    port,
} from './config'

const socket = io('http://'+ serverIP + ':' + port)

export default function App() {

    const playerRef = useRef()
    const [contentID, setContentID] = useState('')
    const [speed, setSpeed] = useState(1)
    const [cursor, setCursor] = useState(0)
    const [leftBound, setLeftBound] = useState(0)
    const [playing, setPlaying] = useState(true)
    const [appOpened, setAppOpened] = useState(false)

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
                end: rightBound,
                duration: clipDuration,
                videoId: getContentID(videoUrl),
            }
            socket.emit('clip', clipObject, received => {
                if(received) console.log('clip received')
                // TODO: clips that have not been receieved by the server
            })
        })
    }

    const handleOnChangeState = (playerState) => {
        // TODO: pickup play time where last left off
        if(playerState === "unstarted" && !appOpened) {
            getData('lastPlaying').then(data => {
                setContentID(data.videoId)
            })
            setAppOpened(true)
        }
        else if(playerState === "paused") {
            playerRef.current.getVideoUrl().then(videoUrl => {
                storeData('lastPlaying', {
                    videoId: getContentID(videoUrl),
                })
            })
        }
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
                onChangeState={playerState => handleOnChangeState(playerState)}
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
