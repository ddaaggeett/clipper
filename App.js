import { StatusBar } from 'expo-status-bar';
import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import { StyleSheet,
    View,
    Dimensions,
    TextInput,
} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Controls from "./src/components/Controls"
import { styles } from "./src/styles"
import getContentID from './src/getContentID'
import { io } from 'socket.io-client'
import {
    storeData,
    getData,
} from './src/storage'
import {
    serverIP,
    port,
} from './config'


const socket = io('http://'+ serverIP + ':' + port)

export default function App() {

    const player = useRef()
    const [contentID, setContentID] = useState('')
    const [speed, setSpeed] = useState(1)
    const [cursor, setCursor] = useState(0)
    const [leftBound, setLeftBound] = useState(0)
    const [playing, setPlaying] = useState(true)
    const [appOpened, setAppOpened] = useState(false)
    const [clips, setClips] = useState([])

    useEffect(() => { // whenever app starts
        getData('clips').then(data => {
            if(data !== null) setClips(data) // array of clips
        })
    },[])

    useEffect(() => {
        if (clips !== undefined) {
            storeData('clips', clips)
            socket.emit('clips', clips, received => {
                if(received) console.log('server received all clips')
            })
        }
    },[clips])

    const handleGetPlayContent = (copiedText) => {
        setContentID(getContentID(copiedText))
    }

    const playerWidth = Dimensions.get('window').width;
    const playerHeight = playerWidth * 3 / 4;

    const handleFinishClip = (rightBound) => {
        setPlaying(true)
        const clipDuration = rightBound - leftBound
        player.current.getVideoUrl().then(videoUrl => {
            const clipObject = {
                start: leftBound,
                end: rightBound,
                duration: clipDuration,
                videoId: getContentID(videoUrl),
                id: Date.now().toString(),
            }
            setClips([...clips, clipObject])
        })
    }

    const handleOnChangeState = (playerState) => {
        // TODO: pickup play time where last left off
        if(playerState === "unstarted" && !appOpened) {
            getData('lastPlaying').then(data => {
                if (data !== null) setContentID(data.videoId)
                else setContentID('')
            })
            setAppOpened(true)
        }
        else if(playerState === "paused") {
            player.current.getVideoUrl().then(videoUrl => {
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
                ref={player}
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
                player={player}
                speed={speed}
                setSpeed={setSpeed}
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
