import React, { useState, useRef, useEffect } from 'react'
import { View, Dimensions, TextInput, Platform } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"
import ReactPlayer from 'react-player'
import Controls from "./Controls"
import { styles } from "../styles"
import getContentID from '../getContentID'
import { io } from 'socket.io-client'
import { serverIP, port, clipInitObject } from '../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

const socket = io('http://'+ serverIP + ':' + port)

export default () => {

    const player = useRef()
    const [playing, setPlaying] = useState(true)
    const [clipPreDB, setClipPreDB] = useState(null)

    const { clips } = useSelector(state => state.clips)
    const { leftCursor, rightCursor, boundCount, editIndex, speed, contentID, videoProgress, panelWidth } = useSelector(state => state.app)
    const { selectingFromPlaylist } = useSelector(state => state.library)
    const { user } = useSelector(state => state.account)
    const redux = useDispatch()

    useEffect(() => {
        if(boundCount == 2) {
            handleFinishClip()
            redux(actions.setBoundCount(0))
            player.current.seekTo(rightCursor)
            setPlaying(true)
            redux(actions.setLeftClipped(false))
            redux(actions.setRightClipped(false))
            redux(actions.setGotSomethingCursor(null))
        }
    }, [boundCount])

    const saveClip = (clipObject) => {
        redux(actions.addPendingClip(clipObject))
        socket.volatile.emit('updateClip', clipObject, returnedClip => {
            redux(actions.fulfillPendingClip(returnedClip))
        })
    }

    const handleFinishClip = () => {
        const clipDuration = rightCursor - leftCursor
        const timestamp = Date.now().toString()
        var clipObject = {
            ...clipInitObject,
            user_id: user.id,
            start: leftCursor,
            end: rightCursor,
            duration: clipDuration,
            key: timestamp,
            timestamp,
        }
        if (Platform.OS === 'web') {
            clipObject = {
                ...clipObject,
                videoId: contentID,
            }
            saveClip(clipObject)
        }
        else player.current.getVideoUrl().then(videoUrl => { // in case playlistID is the contentID
            clipObject = {
                ...clipObject,
                videoId: getContentID(videoUrl),
            }
            saveClip(clipObject)
        })
    }

    const getReactPlayerUrl = () => {
        if(editIndex != null) {
            const start = Math.floor(clips[editIndex].start)
            const end = Math.ceil(clips[editIndex].end)
            // return 'https://www.youtube.com/embed/'+contentID+'?start='+start+'&end=' + end
            return 'https://www.youtube.com/v/' + contentID + '?start=' + start + '&end=' + end
        }
        else return 'https://www.youtube.com/watch?v=' + contentID
    }

    const getConfig = () => {
        if (editIndex != null) {
            return {
                youtube: {
                    playerVars: { end: Math.ceil(clips[editIndex].end) }
                }
            }
        }
        else return {}
    }

    const handleVideoProgress = (progress) => {
        if (editIndex == null) setVideoProgressLocal(progress.playedSeconds)
    }

    const [videoProgressLocal, setVideoProgressLocal] = useState(videoProgress)

    useEffect(() => {
        if (editIndex == null && videoProgressLocal > 0) {
            setTimeout(() => { // TODO: don't do a timeout
                player.current.seekTo(videoProgressLocal)
            }, 500)
        }
    }, [editIndex])

    if (Platform.OS === 'web') {
        return (
            <View>
                <ReactPlayer
                    url={getReactPlayerUrl()}
                    ref={player}
                    playing={playing}
                    playbackRate={speed}
                    width={panelWidth}
                    height={panelWidth * 9 / 16}
                    controls={true}
                    config={getConfig()}
                    onProgress={handleVideoProgress}
                    onPause={() => redux(actions.setVideoProgress(videoProgressLocal))}
                    volume={0}
                    />
                <Controls
                    player={player}
                    handleFinishClip={handleFinishClip}
                    playing={playing}
                    setPlaying={setPlaying}
                    getVideoId={getContentID}
                    screenWidth={panelWidth}
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
                            handleFinishClip={handleFinishClip}
                            playing={playing}
                            setPlaying={setPlaying}
                            getVideoId={getContentID}
                            screenWidth={screenWidth}
                            />
                    </View>
            }
            </View>
        )
    }
}
