import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ScrollView,
} from "react-native"
import React, {
    useState,
    useRef,
} from 'react'
import { styles } from "../styles"
import YoutubePlayer from "react-native-youtube-iframe"
import {
    useSelector,
    useDispatch,
} from 'react-redux'
import { updateClips } from '../redux/actions/actionCreators'
import { io } from 'socket.io-client'
import {
    serverIP,
    port,
} from '../../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const index = props.route.params.index
    const clips = useSelector(state => state.clips)
    const clip = clips[index]
    const [comment, setComment] = useState(clip.comment)
    const [title, setTitle] = useState(clip.title)
    const [who, setWho] = useState(clip.who)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const redux = useDispatch()

    const saveAndExit = () => {
        props.navigation.goBack()
    }

    const handleEditClip = () => {
        const editedClip = {
            ...clip,
            comment: comment,
            title: title,
            who: who,
        }
        editClips(editedClip)
    }

    const editClips = (updatedClip) => {
        const newClips = clips.slice(0,index).concat(updatedClip).concat(clips.slice(index + 1, clips.length))
        redux(updateClips(newClips))
        socket.emit('editClip', updatedClip, received => {
            // TODO: redux update
            if(received) console.log('server edited ',updatedClip)
        })
    }

    const deleteClip = () => {
        const newClips = clips.slice(0,index).concat(clips.slice(index + 1, clips.length))
        redux(updateClips(newClips))
        saveAndExit()
        socket.emit('deleteClip', clip, received => {
            // TODO: redux update
            if(received) console.log('server deleted ', clip)
        })
    }

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.controlButton} onPress={() => saveAndExit()}>
                <Text style={styles.controlButtonText}>{'<-- SAVE CLIP'}</Text>
            </TouchableOpacity>
            <ClipPlayer
                clip={clip}
                />
            <TextInput
                style={[styles.clipItemText, styles.titleInput]}
                multiline={true}
                onChangeText={text => setTitle(text)}
                onEndEditing={handleEditClip}
                value={title}
                placeholder={"TITLE"}
                placeholderTextColor={"yellow"}
                />
            <TextInput
                style={[styles.clipItemText, styles.whoInput]}
                multiline={true}
                onChangeText={text => setWho(text)}
                onEndEditing={handleEditClip}
                value={who}
                placeholder={"WHO"}
                placeholderTextColor={"yellow"}
                />
            <TextInput
                style={[styles.clipItemText, styles.commentInput]}
                multiline={true}
                onChangeText={text => setComment(text)}
                onEndEditing={handleEditClip}
                value={comment}
                placeholder={"DESCRIPTION"}
                placeholderTextColor={"yellow"}
                />
            <Text style={{color:'white'}}>{JSON.stringify(clip, null, 4)}</Text>
            <DeleteClip
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                deleteClip={deleteClip}
                />
        </ScrollView>
    )
}

const DeleteClip = (props) => {

    const buttonWidth = Dimensions.get('window').width/2

    return (
        props.confirmDelete
        ?   <View style={styles.contentRow}>
                <TouchableOpacity style={[styles.controlButton, styles.deleteClip, {width: buttonWidth}]} onPress={() => props.deleteClip()}>
                    <Text style={styles.controlButtonText}>{'CONFIRM DELETE'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, {backgroundColor:'orange', width: buttonWidth}]} onPress={() => props.setConfirmDelete(false)}>
                    <Text style={styles.controlButtonText}>{'CANCEL'}</Text>
                </TouchableOpacity>
            </View>
        :   <TouchableOpacity style={[styles.controlButton, styles.deleteClip]} onPress={() => props.setConfirmDelete(true)}>
                <Text style={styles.controlButtonText}>{'DELETE CLIP'}</Text>
            </TouchableOpacity>
    )
}

const ClipPlayer = (props) => {

    const speed = useSelector(state => state.player.speed)
    const player = useRef()
    const [playing, setPlaying] = useState(false)
    const screenWidth = Dimensions.get('window').width
    const playerHeight = screenWidth * 9 / 16

    return (
        <YoutubePlayer
            ref={player}
            play={playing}
            height={playerHeight}
            width={screenWidth}
            videoId={props.clip.videoId}
            playbackRate={speed}
            initialPlayerParams={{
                // TODO: use exact values instead of integers
                start: Math.floor(props.clip.start),
                end: Math.ceil(props.clip.end),
            }}
            />
    )
}
