import React, { useState, useRef, useEffect } from 'react'
import { View, Dimensions, TextInput, Platform } from 'react-native'
import YoutubePlayer from "./react-native-youtube-iframe"
import ReactPlayer from 'react-player'
import Controls from './Controls'
import ThumbnailSelector from './ThumbnailSelector'
import { styles } from "../styles"
import getContentID from '../getContentID'
import { io } from 'socket.io-client'
import { serverIP, port, clipInitObject } from '../../../config'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const player = useRef()
    const [playing, setPlaying] = useState(true)
    const [clipPreDB, setClipPreDB] = useState(null)

    const { clips } = useSelector(state => state.clips)
    const { leftCursor, rightCursor, boundCount, editIndex, speed, contentID, panelWidth, playingClip } = useSelector(state => state.app)
    const { selectingFromPlaylist, selectingUnfinishedVideo, videoProgressions } = useSelector(state => state.library)
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
        redux(actions.setEditIndex(clips.length))
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
                title: props.pendingTitle,
                videoId: getContentID(videoUrl),
            }
            saveClip(clipObject)
        })
    }

    const updateProgression = (time) => redux(actions.setVideoProgression({videoId: contentID, progress: time}))
    const handleVideoProgress = (progress) => updateProgression(progress.playedSeconds)

    const handleChangeEvent = (event) => {
        if(event === 'paused') player.current.getCurrentTime().then(time => updateProgression(time))
        else if (event === 'ended') updateProgression(null)
    }

    const [videoProgressionsIndex, setVideoProgressionsIndex] = useState(-1)
    useEffect(() => {
        setVideoProgressionsIndex(videoProgressions.findIndex(item => item.videoId === contentID))
    }, [contentID])

    const playAtLatestProgress = () => {
        setTimeout(() => { // TODO: don't do a timeout
            if (videoProgressionsIndex != -1) player.current.seekTo(videoProgressions[videoProgressionsIndex].progress)
            else player.current.seekTo(0)
        }, 500)
    }

    if (Platform.OS === 'web') {
        if (contentID.length == 0) return null
        else return (
            <View>
            {
                playingClip
                ?   <View>
                        <ReactPlayer
                            ref={player}
                            url={'https://www.youtube.com/v/' + clips[editIndex].videoId + '?start=' + Math.floor(clips[editIndex].start) + '&end=' + Math.ceil(clips[editIndex].end)}
                            playing={playing}
                            playbackRate={speed}
                            width={panelWidth}
                            height={panelWidth * 9 / 16}
                            controls={true}
                            onProgress={handleVideoProgress}
                            />
                        <ThumbnailSelector
                            player={player}
                            setPlaying={setPlaying}
                            />
                    </View>
                :   <View>
                        <ReactPlayer
                            ref={player}
                            url={'https://www.youtube.com/watch?v=' + contentID}
                            playing={playing}
                            playbackRate={speed}
                            width={panelWidth}
                            height={panelWidth * 9 / 16}
                            controls={true}
                            onProgress={handleVideoProgress}
                            onEnded={() => updateProgression(null)}
                            onReady={() => playAtLatestProgress()}
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
    else {
        if (contentID.length == 0) return null
        else return (
            <View>
            {
                selectingFromPlaylist || selectingUnfinishedVideo
                ?   <View>
                        <YoutubePlayer
                            ref={player}
                            height={100}
                            width={178}
                            play={playing}
                            onReady={() => playAtLatestProgress()}
                            videoId={contentID}
                            playList={contentID}
                            playbackRate={speed}
                            onPlaybackRateChange={() => setPlaying(true)}
                            onChangeState={handleChangeEvent}
                            />
                    </View>
                :   <View>
                        <YoutubePlayer
                            ref={player}
                            height={Dimensions.get('window').width * 9 / 16}
                            width={Dimensions.get('window').width}
                            play={playing}
                            onReady={() => playAtLatestProgress()}
                            videoId={contentID}
                            playList={contentID}
                            playbackRate={speed}
                            onPlaybackRateChange={() => setPlaying(true)}
                            onChangeState={handleChangeEvent}
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
