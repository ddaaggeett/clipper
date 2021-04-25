import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from '../styles'
import { io } from 'socket.io-client'
import { serverIP, socketPort } from '../../../../config'
import ClipListItem from './ClipListItem'

const socket = io('http://'+ serverIP + ':' + socketPort)

export default (props) => {

    const { clips } = useSelector(state => state.clips)
    const redux = useDispatch()

    const renderClipItems = clips.map(clip => {
        return (
            <ClipListItem
                key={clip.timestamp}
                clip={clip}
                index={clips.findIndex(item => item.timestamp === clip.timestamp)}
                />
        )
    })

    return (
        <div style={styles.clipManager}>
            {renderClipItems}
        </div>
    )
}
