import React, { useState, useEffect, useCallback } from 'react'
import { View, Image } from 'react-native'
import { styles } from '../styles'
import { styles as nativeStyles} from '../../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import DeleteClip from '../../components/DeleteClip'
import EditTitleWhoComment from '../../components/EditTitleWhoComment'
import DownloadClip from '../../components/DownloadClip'
import Thumbnail from '../../components/Thumbnail'

export default (props) => {

    const { editIndex, confirmDelete } = useSelector(state => state.app)
    const isSelected = props.index == editIndex
    const redux = useDispatch()
    const { clips } = useSelector(state => state.clips)

    const handleSelectClipItem = () => redux(actions.setEditIndex(props.index))

    if(isSelected) return (
        <div style={styles.clipItem}>
            <Thumbnail clip={props.clip} />
            <EditTitleWhoComment />
            <View style={nativeStyles.contentRow}>
                { confirmDelete ? null : <DownloadClip /> }
                <DeleteClip />
            </View>
        </div>
    )
    else return (
        <div
            style={styles.clipItem}
            onClick={() => handleSelectClipItem()}
            >
            <View style={nativeStyles.contentRow}>
                <Thumbnail clip={props.clip} />
                <View>
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
                </View>
            </View>
        </div>
    )
}
