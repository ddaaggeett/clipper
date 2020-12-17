import {
    View,
    Button,
} from "react-native"
import React from 'react'
import { styles } from "./styles"


export default (props) => {
    return (
        <View>
            {props.speed === 1 ? <Button title="X 2.0" onPress={() => {props.setSpeed(2)}} /> : <Button title="X 1.0" onPress={() => {props.setSpeed(1)}} />}
            <Button title="<<1s" onPress={() => {props.rewind(1)}} />
        </View>
    )
}
