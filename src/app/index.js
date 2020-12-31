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
import Controls from "./components/Controls"
import { styles } from "./styles"
import getContentID from './getContentID'
import { io } from 'socket.io-client'
import {
    storeData,
    getData,
} from './storage'
import {
    serverIP,
    port,
} from '../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const player = useRef()
    const [contentID, setContentID] = useState('')
    const [speed, setSpeed] = useState(1)
    const [leftCursor, setLeftCursor] = useState(0)
    const [rightCursor, setRightCursor] = useState(0)
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

    const handleFinishClip = () => {
        setPlaying(true)
        const clipDuration = rightCursor - leftCursor
        player.current.getVideoUrl().then(videoUrl => {
            const clipObject = {
                start: leftCursor,
                end: rightCursor,
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
        <View>
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
                leftCursor={leftCursor}
                setLeftCursor={setLeftCursor}
                rightCursor={rightCursor}
                setRightCursor={setRightCursor}
                handleFinishClip={handleFinishClip}
                playing={playing}
                setPlaying={setPlaying}
                getVideoId={getContentID}
                />
        </View>
    );
}
