import { View, Text, TouchableOpacity, Dimensions, Platform } from "react-native"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/actions/actionCreators'
import { styles } from "../styles"
import { ExecuteLeft, ExecuteRight } from './ClipExecute'
import CursorShifts from './Cursor'
import { ClipInitOrDeleteLeft, ClipInitOrDeleteRight } from './ClipInitOrDelete'
import GotSomething from './GotSomething'

export default (props) => {

    const redux = useDispatch()
    const { gotSomethingCursor } = useSelector(state => state.player)

    const buttonWidth = props.screenWidth / 3 // divided by number of buttons in row
    const [handlingLeft, setHandlingLeft] = useState(false)
    const [handlingRight, setHandlingRight] = useState(false)

    const removeBoundCount = (props) => {
        props.setBoundCount(props.boundCount - 1)
    }

    const setGotSomethingCursorOffset = () => {
        props.setPlaying(true)
        const newCursor = gotSomethingCursor - 10 // seems a good rewind amount
        redux(actions.setGotSomethingCursor(newCursor))
        props.player.current.seekTo(newCursor)
    }

    return (
        <View>
            <CursorPlacements
                {...props}
                removeBoundCount={removeBoundCount}
                buttonWidth={buttonWidth}
                handlingLeft={handlingLeft}
                setHandlingLeft={setHandlingLeft}
                handlingRight={handlingRight}
                setHandlingRight={setHandlingRight}
                setGotSomethingCursorOffset={setGotSomethingCursorOffset}
                />
            <CursorShifts
                {...props}
                handlingLeft={handlingLeft}
                handlingRight={handlingRight}
                />
        </View>
    )
}

const CursorPlacements = (props) => {
    if (!props.handlingLeft && !props.handlingRight) return (
        <View style={styles.contentRow}>
            <ClipInitOrDeleteLeft {...props} />
            <GotSomething {...props} />
            <ClipInitOrDeleteRight {...props} />
        </View>
    )
    else if(props.handlingLeft) return  <ExecuteLeft {...props} />
    else if(props.handlingRight) return  <ExecuteRight {...props} />
}
