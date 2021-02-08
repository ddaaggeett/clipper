import React, { useState, useEffect, useCallback } from 'react'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../../config'
import * as actions from '../../redux/actions/actionCreators'
import { DeleteClip } from '../../components/ClipDetails'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.manager)
    const isSelected = props.index == editIndex
    const redux = useDispatch()
    const clips = useSelector(state => state.clips)
    const [comment, setComment] = useState(props.clip.comment)
    const [title, setTitle] = useState(props.clip.title)
    const [who, setWho] = useState(props.clip.who)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleChangeTitle = (event) => setTitle(event.target.value)
    const handleChangeWho = (event) => setWho(event.target.value)
    const handleChangeComment = (event) => setComment(event.target.value)

    useEffect(() => {
        if(!isSelected) handleEditClip()
    },[isSelected])

    const handleEditClip = () => {
        redux(actions.setEditIndex(null))
        const editedClip = {
            ...props.clip,
            comment: comment,
            title: title,
            who: who,
        }
        editClips(editedClip)
    }

    const editClips = (updatedClip) => {
        // TODO: duplicate function in ../../components/ClipDetails
        const newClips = clips.slice(0,props.index).concat(updatedClip).concat(clips.slice(props.index + 1, clips.length))
        redux(actions.updateClips(newClips))
        socket.emit('editClip', updatedClip, received => {
            // TODO: redux update
            if(received) console.log('server edited ',updatedClip)
        })
    }

    const deleteClip = () => {
        // TODO: duplicate function in ../../components/ClipDetails
        const newClips = clips.slice(0,props.index).concat(clips.slice(props.index + 1, clips.length))
        redux(actions.updateClips(newClips))
        socket.emit('deleteClip', props.clip, received => {
            // TODO: redux update
            if(received) console.log('server deleted ', props.clip)
        })
    }

    if(isSelected) return (
        <div style={{...styles.clipItem, ...styles.clipEdit}} >
            <div
                style={{...styles.clipDetail, ...styles.save}}
                onClick={() => handleEditClip()}
                >
                save
                </div>
            <textarea
                style={styles.clipDetail}
                placeholder={'TITLE'}
                value={title}
                onChange={handleChangeTitle}
                />
            <textarea
                style={styles.clipDetail}
                placeholder={'WHO'}
                value={who}
                onChange={handleChangeWho}
                />
            <textarea
                style={styles.clipDetail}
                placeholder={'COMMENT'}
                value={comment}
                onChange={handleChangeComment}
                />
            <DeleteClip
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                deleteClip={deleteClip}
                />

        </div>
    )
    else return (
        <div
            style={styles.clipItem}
            onClick={() => redux(actions.setEditIndex(props.index))}
            >
            <div style={styles.clipDetail}>
                {new Date(props.clip.duration * 1000).toISOString().substr(14, 8)}
            </div>
            {
                props.clip.title.length == 0
                    ?   null
                    :   <div style={styles.clipDetail}>{props.clip.title}</div>
            }
            {
                props.clip.who.length == 0
                    ?   null
                    :   <div style={styles.clipDetail}>{props.clip.who}</div>
            }
            {
                props.clip.comment.length == 0
                    ?   null
                    :   <div style={styles.clipDetail}>{props.clip.comment}</div>
            }
        </div>
    )
}
