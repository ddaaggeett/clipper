import { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default () => {

    const { room } = useSelector(state => state.collaboration)

    if (room) return (
        <View>
            <MessageInput />
            <Messages />
        </View>
    )
    else return null
}

const Messages = () => {

    const { room, messages } = useSelector(state => state.collaboration)

    const renderMessages = messages.map((message, key) => {
        return <Text style={styles.text} key={key}>{`${message}`}</Text>
    })

    return (
        <View>
            <Text style={styles.text}>{`${room.id} messages`}</Text>
            <View>{renderMessages}</View>
        </View>
    )
}

const MessageInput = () => {

    const [messageText, setMessageText] = useState('')

    const handleSendMessage = () => {
        // sendMessage(messageText)
        setMessageText('')
    }

    const enterMessage = (key) => {
        if (key === 'Enter') handleSendMessage()
        else if (key === 'Escape') setMessageText('')
    }
    return (
        <View style={styles.messageInput}>
            <TextInput
                style={[styles.textInput, styles.text]}
                onChangeText={text => setMessageText(text)}
                value={messageText}
                placeholder={'type message here'}
                placeholderTextColor={"white"}
                autoFocus={true}
                autoCapitalize={'none'}
                onKeyPress={({nativeEvent}) => enterMessage(nativeEvent.key)}
                />
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSendMessage()}
                >
                <Text style={styles.text}>{`SEND`}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    messageInput: {
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        padding: 10,
        margin: 5,
    },
    button: {
        padding: 40,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#444',
        alignSelf: 'center',
        margin: 1,
    },
    text: {
        color: 'white',
    },
})
