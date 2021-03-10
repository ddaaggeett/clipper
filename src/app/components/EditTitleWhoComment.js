import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import { styles } from '../styles'
import { styles as webStyles } from '../web/styles'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../config'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)
    const [comment, setComment] = useState()
    const [title, setTitle] = useState()
    const [who, setWho] = useState()
    const redux = useDispatch()

    const handleChangeTitle = (event) => setTitle(event.target.value)
    const handleChangeWho = (event) => setWho(event.target.value)
    const handleChangeComment = (event) => setComment(event.target.value)

    useEffect(() => {
        if(editIndex != null) {
            setComment(clips[editIndex].comment)
            setTitle(clips[editIndex].title)
            setWho(clips[editIndex].who)
        }
    }, [editIndex])

    useEffect(() => {
        return () => redux(actions.setEditIndex(null))
    }, [])

    const controlEnterPress = (event) => {
        if (event.ctrlKey && event.keyCode == 13) handleEditClip()
    }

    useEffect(() => {
        if (Platform.OS === 'web') window.addEventListener('keydown', controlEnterPress)

        return () => {
            if (Platform.OS === 'web') window.removeEventListener('keydown', controlEnterPress)
        }
    }, [controlEnterPress])

    const editClips = (updatedClip) => {
        if(Platform.OS === 'web') redux(actions.setEditIndex(null))
        redux(actions.updatePendingClip(updatedClip))
        socket.volatile.emit('updateClip', updatedClip, returnedClip => {
            redux(actions.fulfillPendingClip(returnedClip))
        })
    }

    const handleEditClip = () => {
        const editedClip = {
            ...clips[editIndex],
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
                autoFocus={true}
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
