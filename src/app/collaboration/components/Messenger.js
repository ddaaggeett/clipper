import { useEffect, useState, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

export default () => {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
            <RoomMembers />
            <MessageInput />
            <Messages />
        </SafeAreaView>
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
            <Text style={styles.text}>{`Group ${room.id} members: `}</Text>
            <View style={styles.names}>{renderRoomMembers(room.users)}</View>
        </View>
    )
}

const Messages = () => {

    const { room } = useSelector(state => state.collaboration)
    const { user } = useSelector(state => state.account)

    const leftright = (userID) => {
        if (userID === user.id) return { alignSelf: 'flex-end' }
    }

    const color = (userID) => {
        if (userID === user.id) return { backgroundColor: '#202' }
    }

    const renderMessages = room.messages.slice(0).reverse().map((message, key) => {
        return (
            <View
                style={[styles.message, leftright(message.userID)]}
                key={key}
                >
                <Text style={[styles.text, styles.messageUser, leftright(message.userID)]}>{`${message.userID}: ${message.timestamp}`}</Text>
                <Text style={[styles.text, styles.messageText, leftright(message.userID), color(message.userID)]}>{`${message.text}`}</Text>
            </View>
        )
    })

    return (
        <View style={styles.messages}>
            { room.messages.length == 0 ? null : <View>{renderMessages}</View> }
        </View>
    )
}

const MessageInput = () => {

    const input = useRef()
    const [messageText, setMessageText] = useState('')
    const { user } = useSelector(state => state.account)
    const { room } = useSelector(state => state.collaboration)

    useEffect(() => {
        if (messageText.length == 0) input.current.focus()
    }, [messageText])

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
                ref={input}
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
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
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
        width: '65%',
        color: 'white',
    },
    message: {
        width: '60%',
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    messageUser: {
        margin: 2,
        alignSelf: 'flex-start',
    },
    messageText: {
        backgroundColor: '#400',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
})
