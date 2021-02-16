import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import { styles } from '../styles'
import { styles as webStyles } from '../web/styles'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.manager)
    const clips = useSelector(state => state.clips)
    const clip = clips[editIndex]
    const [comment, setComment] = useState(clip.comment)
    const [title, setTitle] = useState(clip.title)
    const [who, setWho] = useState(clip.who)
    const redux = useDispatch()

    const handleChangeTitle = (event) => setTitle(event.target.value)
    const handleChangeWho = (event) => setWho(event.target.value)
    const handleChangeComment = (event) => setComment(event.target.value)

    const editClips = (updatedClip) => {
        const newClips = clips.slice(0, editIndex).concat(updatedClip).concat(clips.slice(editIndex + 1, clips.length))
        redux(actions.updateClips(newClips))
        redux(actions.setEditIndex(null))
        socket.emit('editClip', updatedClip, received => {
            if(received) console.log('server edited ',updatedClip)
        })
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

    if(Platform.OS === 'web') return (
        <div style={webStyles.clipEdit}>
            <TouchableOpacity
                style={[styles.controlButton, {backgroundColor: 'green'}]}
                onPress={() => handleEditClip()}
                >
                <Text style={styles.controlButtonText}>SAVE</Text>
            </TouchableOpacity>
            <textarea
                style={webStyles.clipDetail}
                placeholder={'TITLE'}
                value={title}
                onChange={handleChangeTitle}
                />
            <textarea
                style={webStyles.clipDetail}
                placeholder={'WHO'}
                value={who}
                onChange={handleChangeWho}
                />
            <textarea
                style={webStyles.clipDetail}
                placeholder={'COMMENT'}
                value={comment}
                onChange={handleChangeComment}
                />
        </div>
    )
    else return (
        <View>
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
        </View>
    )
}
