import React, { useState, useEffect, useCallback } from 'react'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import DeleteClip from '../../components/DeleteClip'
import EditTitleWhoComment from '../../components/EditTitleWhoComment'

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const isSelected = props.index == editIndex
    const redux = useDispatch()
    const { clips } = useSelector(state => state.clips)

    const handleSelectClipItem = () => redux(actions.setEditIndex(props.index))

    if(isSelected) return (
        <div style={styles.clipItem}>
            <EditTitleWhoComment />
            <DeleteClip />
        </div>
    )
    else return (
        <div
            style={styles.clipItem}
            onClick={() => handleSelectClipItem()}
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
