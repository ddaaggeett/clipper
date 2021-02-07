import React, { useState, useEffect, useCallback } from 'react'
import { styles } from '../styles'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { serverIP, port } from '../../../../config'
import * as actions from '../../redux/actions/actionCreators'

const socket = io('http://'+ serverIP + ':' + port)

export default (props) => {

    const { editIndex } = useSelector(state => state.manager)
    const isSelected = props.index == editIndex
    const redux = useDispatch()

    if(isSelected) return (
        <div style={{...styles.clipItem, ...styles.clipEdit}} >
            <div
                style={{...styles.clipDetail, ...styles.save}}
                onClick={() => redux(actions.setEditIndex(null))}
                >
                save
                </div>
            <textarea
                style={styles.clipDetail}
                placeholder={'TITLE'}
                />
            <textarea
                style={styles.clipDetail}
                placeholder={'WHO'}
                />
            <textarea
                style={styles.clipDetail}
                placeholder={'COMMENT'}
                />
        </div>
    )
    else return (
        <div style={styles.clipItem} onClick={() => redux(actions.setEditIndex(props.index))}>
            <div style={styles.clipDetail}>
                <div>clip length</div>
                <div>{new Date(props.clip.duration * 1000).toISOString().substr(14, 8)}</div>
            </div>
            <div style={styles.clipDetail}>
                {props.clip.timestamp}
            </div>
        </div>
    )
}
