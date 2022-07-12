import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import React from 'react'

export default (props) => {

    const rewind = () => {
        props.player.current.getCurrentTime().then(time => {
            props.player.current.seekTo(time - 10)
        })
    }

    const fastForward = () => {
        props.player.current.getCurrentTime().then(time => {
            props.player.current.seekTo(time + 10)
        })
    }

    const playerHeight = Dimensions.get('window').width * 9 / 16
    const margin = 60

    const [height, setHeight] = React.useState(playerHeight - (margin * 2))

    return (
        <View style={[styles.buttonContainer,{top:margin}]}>
            <TouchableOpacity
                style={[styles.button,styles.rwd,{height}]}
                onPress={() => rewind()}>
                <Text style={styles.text}>{`<<`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button,styles.ffd,{height}]}
                onPress={() => fastForward()}>
                <Text style={styles.text}>{`>>`}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
    },
    button: {
        flex: 1,
        position: 'absolute',
        width:'40%',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    rwd: {
        left: 0,
    },
    ffd: {
        right:0,
    },
    text: {
        fontSize: 30,
        color: 'white',
    },
})
