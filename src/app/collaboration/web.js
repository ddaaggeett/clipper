import { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
const actions = require('./redux/actions/actionCreators')
const { useGroupSession, joinRoom } = require('./hooks')

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

const GroupSession = () => {

    useGroupSession()
    const { rooms } = useSelector(state => state.collaboration)

    return (
        <View style={styles.session}>
            { rooms.length == 0 ? null : <SelectGroupSession /> }
            <CreateGroupSession />
        </View>
    )
}

const SelectGroupSession = () => {

    const { rooms } = useSelector(state => state.collaboration)
    const { setSelectedRoom } = joinRoom()

    // TODO: error occurring here. But shouldn't be rendering because rooms = empty[]
    const renderSessionUserList = (room) => room.users.map((user, key) => {
        return <Text style={styles.text} key={key}>{`${user.id}`}</Text>
    })

    const renderRoomSelections = rooms.map((room, key) => {
        return (
            <TouchableOpacity
                style={[styles.sessionButton, styles.button]}
                onPress={() => setSelectedRoom(room)}
                key={key}
                >
                <View style={styles.sessionButtons}>{renderSessionUserList(room)}</View>
            </TouchableOpacity>
        )
    })

    return (
        <View style={styles.session}>
            <Text style={[styles.sessionButton, styles.text]}>{`select session`}</Text>
            <View style={styles.sessionButtons}>{renderRoomSelections}</View>
            <Text style={[styles.sessionButton, styles.text]}>{`or`}</Text>
        </View>
    )
}

const CreateGroupSession = () => {

    const { setSelectedRoom } = joinRoom()

    return (
        <TouchableOpacity
            style={[styles.sessionButton, styles.button, styles.createGroup]}
            onPress={() => setSelectedRoom('new')}
            >
            <Text style={styles.text}>{`Create Group Session`}</Text>
        </TouchableOpacity>
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
        margin: 3,
    },
    sessionButton: {
        padding: 10,
    },
    sessionButtons: {
        flexDirection: 'column',
    },
    createGroup: {
        backgroundColor: 'green'
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
