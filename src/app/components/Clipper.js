import { StatusBar } from 'expo-status-bar';
import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react'
import {
    View,
    Dimensions,
    TextInput,
} from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"
import Controls from "./Controls"
import { styles } from "../styles"
import getContentID from '../getContentID'
import { useFocusEffect } from '@react-navigation/native'
import { io } from 'socket.io-client'
import {
    storeData,
    getData,
} from '../storage'
import {
    serverIP,
    port,
    clipInitObject,
} from '../../../config'
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const player = useRef()
    const [contentID, setContentID] = useState('')
    const [leftCursor, setLeftCursor] = useState(0)
    const [rightCursor, setRightCursor] = useState(0)
    const [playing, setPlaying] = useState(true)
    const [appOpened, setAppOpened] = useState(false)
    const [boundCount, setBoundCount] = useState(0)
    const [clipping, setClipping] = useState(true)
    const [leftClipped, setLeftClipped] = useState(false)
    const [rightClipped, setRightClipped] = useState(false)

    const clips = useSelector(state => state.clips)
    const speed = useSelector(state => state.player.speed)
    const redux = useDispatch()

    useEffect(() => {
        socket.emit('allClips', clips, received => {
            if(received) console.log('server received all clips')
        })
    },[]) // run only once on startup

    useEffect(() => {
        if(boundCount == 2) {
            handleFinishClip()
            setBoundCount(0)
            player.current.seekTo(rightCursor)
            setPlaying(true)
            setLeftClipped(false)
            setRightClipped(false)
        }
    }, [boundCount])

    const handleGetPlayContent = (copiedText) => {
        setContentID(getContentID(copiedText))
    }

    const screenWidth = Dimensions.get('window').width
    const playerHeight = screenWidth * 9 / 16

    const handleFinishClip = () => {
        const clipDuration = rightCursor - leftCursor
        player.current.getVideoUrl().then(videoUrl => {
            const clipObject = {
                ...clipInitObject,
                start: leftCursor,
                end: rightCursor,
                duration: clipDuration,
                videoId: getContentID(videoUrl),
                id: Date.now().toString(),
            }
            redux(actions.updateClips([...clips, clipObject]))
            socket.emit('addClip', clipObject, received => {
                if(received) console.log('server added ',clipObject)
            })
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

    const handleSetSpeed = (newSpeed) => {
        redux(actions.updatePlayer({speed:newSpeed}))
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
                width={screenWidth}
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
                setSpeed={handleSetSpeed}
                leftCursor={leftCursor}
                setLeftCursor={setLeftCursor}
                rightCursor={rightCursor}
                setRightCursor={setRightCursor}
                handleFinishClip={handleFinishClip}
                playing={playing}
                setPlaying={setPlaying}
                getVideoId={getContentID}
                boundCount={boundCount}
                setBoundCount={setBoundCount}
                screenWidth={screenWidth}
                leftClipped={leftClipped}
                setLeftClipped={setLeftClipped}
                rightClipped={rightClipped}
                setRightClipped={setRightClipped}
                />
        </View>
    );
}
