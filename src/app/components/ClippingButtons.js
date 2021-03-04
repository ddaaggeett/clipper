import { View, Text, TouchableOpacity, Dimensions } from "react-native"
import React, { useState } from 'react'
import { styles } from "../styles"
import { ExecuteLeft, ExecuteRight } from './ClipExecute'
import CursorShifts from './Cursor'
import { ClipInitOrDeleteLeft, ClipInitOrDeleteRight } from './ClipInitOrDelete'

export default (props) => {

    const [handlingLeft, setHandlingLeft] = useState(false)
    const [handlingRight, setHandlingRight] = useState(false)

    return (
        <View>
            <LeftOrRight
                {...props}
                handlingLeft={handlingLeft}
                setHandlingLeft={setHandlingLeft}
                handlingRight={handlingRight}
                setHandlingRight={setHandlingRight}
                />
            <CursorShifts
                {...props}
                handlingLeft={handlingLeft}
                handlingRight={handlingRight}
                />
        </View>
    )
}

const LeftOrRight = (props) => {

    const buttonWidth = props.screenWidth / 2 // divided by bumber of buttons in row

    const removeBoundCount = (props) => {
        props.setBoundCount(props.boundCount - 1)
    }

    if (!props.handlingLeft && !props.handlingRight) return (
        <View style={styles.contentRow}>
            <ClipInitOrDeleteLeft
                {...props}
                buttonWidth={buttonWidth}
                removeBoundCount={removeBoundCount}
                />
            <ClipInitOrDeleteRight
                {...props}
                buttonWidth={buttonWidth}
                removeBoundCount={removeBoundCount}
                />
        </View>
    )
    else if(props.handlingLeft) return (
        <ExecuteLeft
            {...props}
            buttonWidth={buttonWidth}
            />
    )
    else if(props.handlingRight) return (
        <ExecuteRight
            {...props}
            buttonWidth={buttonWidth}
            />
    )
}
