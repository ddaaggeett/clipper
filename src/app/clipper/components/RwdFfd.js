import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useState } from 'react'

export default (props) => {

    const playerHeight = Dimensions.get('window').width * 9 / 16
    const seekInterval = 5
    const margin = 35
    const [height, setHeight] = useState(playerHeight - (margin * 2))
    const [buttonBorderWidth, setButtonBorderWidth] = useState(0)
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState(0)

    const handleButtonVisibility = (direction) => {
        setButtonBorderWidth(1)
        setButtonBackgroundColor('rgba(255,0,0,0.3)')
        setTimeout(() => {
            setButtonBorderWidth(0)
            setButtonBackgroundColor()
        }, 250)
    }

    const rewind = () => {
        handleButtonVisibility('rwd')
        props.player.current.getCurrentTime().then(time => {
            props.player.current.seekTo(time - seekInterval)
        })
    }

    const fastForward = () => {
        handleButtonVisibility('ffd')
        props.player.current.getCurrentTime().then(time => {
            props.player.current.seekTo(time + seekInterval)
        })
    }

    return (
        <View style={[styles.buttonContainer]}>
            <TouchableOpacity
                style={[styles.button,styles.rwd,{
                    height,
                    borderWidth: buttonBorderWidth,
                    backgroundColor: buttonBackgroundColor,
                }]}
                onPress={() => rewind()}>
                {buttonBorderWidth == 0 ? null : <Text style={styles.text}>{`<<`}</Text>}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button,styles.ffd,{
                    height,
                    borderWidth: buttonBorderWidth,
                    backgroundColor: buttonBackgroundColor,
                }]}
                onPress={() => fastForward()}>
                {buttonBorderWidth == 0 ? null : <Text style={styles.text}>{`>>`}</Text>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        top: 0,
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
    },
    button: {
        flex: 1,
        position: 'absolute',
        width:'35%',
        borderColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-around',
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
        alignSelf: 'center',
    },
})
