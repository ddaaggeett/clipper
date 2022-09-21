import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Messenger from './components/Messenger'
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

    const renderSessionUserList = (room) => room.users.map((user, key) => {
        return <Text style={styles.text} key={key}>{`${room.id} ${user.id}`}</Text>
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
