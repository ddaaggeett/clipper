import React, { useState, useEffect, useCallback } from 'react'
import { View, Image } from 'react-native'
import { styles } from '../styles'
import { styles as nativeStyles} from '../../styles'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import EditClipInfo from '../../components/EditClipInfo'
import Thumbnail from '../../components/Thumbnail'

export default (props) => {

    const { editIndex } = useSelector(state => state.app)
    const isSelected = props.index == editIndex
    const redux = useDispatch()
    const { clips } = useSelector(state => state.clips)

    const handleSelectClipItem = () => redux(actions.setEditIndex(props.index))

    if(isSelected) return (
        <div style={styles.clipItem}>
            <Thumbnail
                clip={props.clip}
                index={props.index}
                />
            <EditClipInfo />
        </div>
    )
    else return (
        <div
            style={styles.clipItem}
            onClick={() => handleSelectClipItem()}
            >
            <View style={nativeStyles.contentRow}>
                <Thumbnail
                    clip={props.clip}
                    index={props.index}
                    />
                <View>
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
                </View>
            </View>
        </div>
    )
}
