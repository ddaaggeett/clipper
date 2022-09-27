import { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../hooks'

export default () => {
    return (
        <View>
            <RoomMembers />
            <MessageInput />
            <Messages />
        </View>
    )
}

const RoomMembers = () => {

    const { room } = useSelector(state => state.collaboration)

    const renderRoomMembers = (users) => users.map((user, index) => {
        return (
            <View style={styles.names} key={index}>
                { index == 0 ? null : <Text style={styles.text}>{`, `}</Text>}
                <Text style={[styles.text, {fontWeight: 'bold',}]}>{`${user.id}`}</Text>
            </View>
        )
    })

    return (
        <View style={styles.roomMembersRow}>
            <Text style={styles.text}>{`Members in this group:  `}</Text>
            <View style={styles.names}>{renderRoomMembers(room.users)}</View>
        </View>
    )
}

const Messages = () => {

    const { rooms, room } = useSelector(state => state.collaboration)

    const renderMessages = room.messages.map((message, key) => {
        return <Text style={styles.text} key={key}>{`${message.userID} says: ${message.text}`}</Text>
    })

    return (
        <View style={styles.messages}>
            <Text style={styles.text}>{`${room.id} messages`}</Text>
            { room.messages.length == 0 ? null : <View>{renderMessages}</View> }
        </View>
    )
}

const MessageInput = () => {

    const [messageText, setMessageText] = useState('')
    const { user } = useSelector(state => state.account)
    const { room } = useSelector(state => state.collaboration)

    const handleSendMessage = () => {
        const message = {
            timestamp: Date.now(),
            text: messageText,
            userID: user.id,
            roomID: room.id,
        }
        sendMessage(message)
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
        padding: 5,
    },
    textInput: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        padding: 11,
        margin: 3,
    },
    button: {
        padding: 30,
        paddingTop: 11,
        paddingBottom: 11,
        backgroundColor:'#444',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 3,
    },
    text: {
        color: 'white',
    },
    roomMembersRow: {
        flexDirection: 'row',
        margin: 10,
    },
    names: {
        flexDirection: 'row',
    },
    roomMembers: {
        flex: 1,
        flexDirection: 'column',
    },
    messages: {
        margin: 10,
    },
})
