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

    const handleSetSpeed = (newSpeed) => {
        redux(actions.updateSpeed(newSpeed))
    }

    return (
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
    );
}
