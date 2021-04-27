import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import { styles } from '../styles'
import { styles as webStyles } from '../web/styles'
import * as actions from '../redux/actions/actionCreators'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../config'
import EditClipOptions from './EditClipOptions'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const { clips } = useSelector(state => state.clips)
    const [thumbnailText, setThumbnailText] = useState()
    const [title, setTitle] = useState()
    const [who, setWho] = useState()
    const redux = useDispatch()

    const handleChangeTitle = (event) => setTitle(event.target.value)
    const handleChangeWho = (event) => setWho(event.target.value)
    const handleChangeThumbnailText = (event) => setThumbnailText(event.target.value)

    useEffect(() => {
        if(editIndex != null) {
            setThumbnailText(clips[editIndex].thumbnailText)
            setTitle(clips[editIndex].title)
            setWho(clips[editIndex].who)
        }
    }, [editIndex])

    useEffect(() => {
        return () => {
            redux(actions.setConfirmDelete(false))
            redux(actions.setEditIndex(null))
        }
    }, [])

    const keyControls = (event) => {
        if (event.ctrlKey && event.keyCode == 13) handleEditClip()
        else if (event.key === 'Escape') redux(actions.setEditIndex(null))
    }

    useEffect(() => {
        if (Platform.OS === 'web') window.addEventListener('keydown', keyControls)

        return () => {
            if (Platform.OS === 'web') window.removeEventListener('keydown', keyControls)
        }
    }, [keyControls])

    const updateEditedClip = (updatedClip) => {
        if(Platform.OS === 'web') redux(actions.setEditIndex(null))
        redux(actions.updatePendingClip(updatedClip))
        socket.volatile.emit('updateClip', updatedClip, returnedClip => {
            redux(actions.fulfillPendingClip(returnedClip))
        })
    }

    const handleEditClip = () => {
        const editedClip = {
            ...clips[editIndex],
            thumbnailText,
            title,
            who,
        }
        updateEditedClip(editedClip)
    }

    if(Platform.OS === 'web') return (
        <div style={webStyles.clipEdit}>
            <EditClipOptions
                handleEditClip={handleEditClip}
                />
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
                placeholder={'THUMBNAIL TEXT'}
                value={thumbnailText}
                onChange={handleChangeThumbnailText}
                />
        </div>
    )
    else return (
        <View>
            <TextInput
                style={[styles.clipItemTextInput, styles.titleInput]}
                multiline={true}
                onChangeText={text => setTitle(text)}
                onEndEditing={handleEditClip}
                value={title}
                placeholder={"TITLE"}
                placeholderTextColor={"yellow"}
                />
            <TextInput
                style={[styles.clipItemTextInput, styles.whoInput]}
                multiline={true}
                onChangeText={text => setWho(text)}
                onEndEditing={handleEditClip}
                value={who}
                placeholder={"WHO"}
                placeholderTextColor={"yellow"}
                />
            <TextInput
                style={[styles.clipItemTextInput, styles.commentInput]}
                multiline={true}
                onChangeText={text => setThumbnailText(text)}
                onEndEditing={handleEditClip}
                value={thumbnailText}
                placeholder={"THUMBNAIL TEXT"}
                placeholderTextColor={"yellow"}
                />
        </View>
    )
}
