import { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../hooks'

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

    const { rooms, room } = useSelector(state => state.collaboration)

    const index = rooms.findIndex(item => item.id === room.id)

    let roomMessages
    if (rooms[index].messages != undefined) roomMessages = rooms[index].messages
    else roomMessages = null

    // TODO: roomMessages[] will not map. check redux
    const renderMessages = roomMessages.map((message, key) => {
        return <Text style={styles.text} key={key}>{`${message.userID} says: ${message.text}`}</Text>
    })

    return (
        <View>
            <Text style={styles.text}>{`${room.id} messages`}</Text>
            {() => {
                if (roomMessages) return null
                else return <View>{renderMessages}</View>
            }}
        </View>
    )
}

const MessageInput = () => {

    const [messageText, setMessageText] = useState('')
    const { user } = useSelector(state => state.account)
    const { room } = useSelector(state => state.collaboration)

    const handleSendMessage = () => {
        const messageObject = {
            timestamp: Date.now(),
            text: messageText,
            userID: user.id,
            roomID: room.id,
        }
        sendMessage(messageObject)
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
