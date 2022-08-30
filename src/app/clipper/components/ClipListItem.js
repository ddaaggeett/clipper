import React, { useState, useEffect, useCallback } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import EditClipInfo from './EditClipInfo'
import Thumbnail from './Thumbnail'

export default (props) => {

    const { editIndex } = useSelector(state => state.clipper)
    const isSelected = props.index == editIndex
    const redux = useDispatch()
    const { clips } = useSelector(state => state.clips)

    const handleSelectClipItem = () => redux(actions.setEditIndex(props.index))

    if(isSelected) return (
        <div style={webStyles.clipItem}>
            <Thumbnail
                clip={props.clip}
                index={props.index}
                />
            <EditClipInfo />
        </div>
    )
    else return (
        <div
            style={webStyles.clipItem}
            onClick={() => handleSelectClipItem()}
            >
            <View style={styles.contentRow}>
                <Thumbnail
                    clip={props.clip}
                    index={props.index}
                    />
                <View style={{flex:1}}>
                    {
                        props.clip.title.length == 0
                        ?   null
                        :   <div style={webStyles.clipDetail}>{props.clip.title}</div>
                    }
                    {
                        props.clip.who.length == 0
                        ?   null
                        :   <div style={webStyles.clipDetail}>{props.clip.who}</div>
                    }
                </View>
            </View>
        </div>
    )
}

const styles = StyleSheet.create({
    contentRow: {
        flexDirection:"row",
    },
})

const webStyles = {
    clipItem: {
        display: 'flex',
        flexFlow: 'column nowrap',
        fontFamily: 'Sans',
        fontSize: 14,
        color:'yellow',
        backgroundColor:'#222',
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
}
