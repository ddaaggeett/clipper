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
    Platform,
} from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"
import ReactPlayer from 'react-player'
import Controls from "./Controls"
import { styles } from "../styles"
import getContentID from '../getContentID'
import { io } from 'socket.io-client'
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
    const [leftCursor, setLeftCursor] = useState(0)
    const [rightCursor, setRightCursor] = useState(0)
    const [playing, setPlaying] = useState(true)
    const [appOpened, setAppOpened] = useState(false)
    const [boundCount, setBoundCount] = useState(0)
    const [leftClipped, setLeftClipped] = useState(false)
    const [rightClipped, setRightClipped] = useState(false)

    const clips = useSelector(state => state.clips)
    const speed = useSelector(state => state.player.speed)
    const contentID = useSelector(state => state.player.contentID)
    const selectingFromPlaylist = useSelector(state => state.library.selectingFromPlaylist)
    const redux = useDispatch()

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

    const sendClip = (clipObject) => {
        redux(actions.updateClips([...clips, clipObject]))
        socket.emit('addClip', clipObject, received => {
            if(received) console.log('server added ',clipObject)
        })
    }

    const handleFinishClip = () => {
        const clipDuration = rightCursor - leftCursor
        const timestamp = Date.now().toString()
        if (Platform.OS === 'web') {
            const clipObject = {
                ...clipInitObject,
                start: leftCursor,
                end: rightCursor,
                duration: clipDuration,
                videoId: contentID,
                key: timestamp,
                timestamp,
            }
            sendClip(clipObject)
        }
        else player.current.getVideoUrl().then(videoUrl => { // in case playlistID is the contentID
            const clipObject = {
                ...clipInitObject,
                start: leftCursor,
                end: rightCursor,
                duration: clipDuration,
                videoId: getContentID(videoUrl),
                key: timestamp,
                timestamp,
            }
            sendClip(clipObject)
        })
    }

    const handleSetSpeed = (newSpeed) => {
        redux(actions.updateSpeed(newSpeed))
    }

    if (Platform.OS === 'web') {
        const playerWidth = Dimensions.get('window').width/2
        const playerHeight = playerWidth * 9 / 16

        return (
            <View>
                <ReactPlayer
                    url={'https://www.youtube.com/watch?v=' + contentID}
                    ref={player}
                    playing={playing}
                    playbackRate={speed}
                    width={playerWidth}
                    height={playerHeight}
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
                    screenWidth={playerWidth}
                    leftClipped={leftClipped}
                    setLeftClipped={setLeftClipped}
                    rightClipped={rightClipped}
                    setRightClipped={setRightClipped}
                    />
            </View>
        )
    }
    else {
        const screenWidth = Dimensions.get('window').width
        const playerHeight = screenWidth * 9 / 16

        return ( // iOS/android
            <View>
            {
                selectingFromPlaylist
                ?   <View>
                        <YoutubePlayer
                            ref={player}
                            height={100}
                            width={178}
                            play={playing}
                            onReady={() => setPlaying(true)}
                            videoId={contentID}
                            playList={contentID}
                            playbackRate={speed}
                            onPlaybackRateChange={() => setPlaying(true)}
                            />
                    </View>
                :   <View>
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
            }
            </View>
        )
    }
}
