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
    const { leftCursor, rightCursor, boundCount, editIndex, speed, contentID, videoProgress, panelWidth, playingClip } = useSelector(state => state.app)
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

    const [videoProgressLocal, setVideoProgressLocal] = useState(videoProgress)
    const handleVideoProgress = (progress) => setVideoProgressLocal(progress.playedSeconds)

    useEffect(() => {
        if (editIndex == null && videoProgressLocal > 0) {
            setTimeout(() => { // TODO: don't do a timeout
                player.current.seekTo(videoProgressLocal)
            }, 500)
        }
    }, [editIndex])

    if (Platform.OS === 'web') {
        if (contentID == null) return null
        else return (
            <View>
            {
                playingClip
                ?   <ReactPlayer
                        ref={player}
                        url={'https://www.youtube.com/v/' + clips[editIndex].videoId + '?start=' + Math.floor(clips[editIndex].start) + '&end=' + Math.ceil(clips[editIndex].end)}
                        playing={playing}
                        playbackRate={speed}
                        width={panelWidth}
                        height={panelWidth * 9 / 16}
                        controls={true}
                        onProgress={handleVideoProgress}
                        onPause={() => redux(actions.setVideoProgress(videoProgressLocal))}
                        volume={100}
                        />
                :   <ReactPlayer
                        ref={player}
                        url={'https://www.youtube.com/watch?v=' + contentID}
                        playing={playing}
                        playbackRate={speed}
                        width={panelWidth}
                        height={panelWidth * 9 / 16}
                        controls={true}
                        onProgress={handleVideoProgress}
                        onPause={() => redux(actions.setVideoProgress(videoProgressLocal))}
                        volume={100}
                        />
            }
                <Controls
                    player={player}
                    handleFinishClip={handleFinishClip}
                    playing={playing}
                    setPlaying={setPlaying}
                    getVideoId={getContentID}
                    />
            </View>
        )
    }
    else {
        if (contentID == null) return null
        else return (
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
                            height={Dimensions.get('window').width * 9 / 16}
                            width={Dimensions.get('window').width}
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
                            />
                    </View>
            }
            </View>
        )
    }
}
