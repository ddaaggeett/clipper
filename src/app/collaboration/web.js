import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
const actions = require('./redux/actions/actionCreators')
const { initCollaboration } = require('./hooks')

export default () => {
    return (
        <View style={styles.container}>
            <GroupSession />
            <Messenger />
        </View>
    )
}

const Messenger = () => {

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
            <Text style={styles.text}>{`GroupSession ${room} messages`}</Text>
            <View>{renderMessages}</View>
        </View>
    )
}

const MessageInput = () => {

    const { sendMessage } = initCollaboration()

    const [messageText, setMessageText] = useState('')

    const handleSendMessage = () => {
        sendMessage(messageText)
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

const GroupSession = () => {

    const redux = useDispatch()
    const { rooms } = useSelector(state => state.collaboration)

    const updateRoom = (room) => {
        redux(actions.updateRoom(room))
    }

    const renderRoomSelections = rooms.map((room, key) => {
        return (
            <TouchableOpacity
                style={[styles.sessionButton, styles.button]}
                onPress={() => updateRoom(room)}
                key={key}
                >
                <Text style={styles.text}>{`GroupSession ${room}`}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <View style={styles.session}>
            <Text style={[styles.sessionButton, styles.text]}>{`select session`}</Text>
            <View style={styles.sessionButtons}>{renderRoomSelections}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#000',
        borderColor: 'white',
        borderWidth: 1,
    },
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
    session: {
        flexDirection: 'row',
    },
    sessionButton: {
        padding: 10,
    },
    sessionButtons: {
        flexDirection: 'row',
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
