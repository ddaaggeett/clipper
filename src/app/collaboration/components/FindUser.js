import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../hooks'

export default () => {

    const [users, setUsers] = useState([])
    const [searchString, setSearchString] = useState('')
    const { user } = useSelector(state => state.account)
    const socket = useSocket()

    useEffect(() => {
        return () => {
            setUsers([])
            setSearchString('')
        }
    }, [])

    useEffect(() => {
        if (searchString.length > 0) {
            socket.emit('find_users', searchString, users => {
                setUsers(users)
            })
        }
        else setUsers([])
    }, [searchString])


    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.text, styles.textInput, styles.searchItem]}
                onChangeText={text => setSearchString(text)}
                value={searchString}
                placeholder={"search for user"}
                placeholderTextColor={"white"}
                />
            <UserList
                users={users}
                style={[styles.userList, styles.searchItem]}
                />
        </View>
    )
}

const UserList = (props) => {

    const selectUser = user => {
    }

    const renderUsers = (users) => users.map((user, key) => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => selectUser(user)}
                key={key}
                >
                <Text style={styles.text} >{`${user.name}`}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <View>
            {renderUsers(props.users)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    textInput: {
        flex: 1,
        marginTop: 10,
        padding: 6,
        borderRadius: 4,
        borderColor: 'white',
        borderWidth: 1,
    },
    userList: {
    },
    searchItem: {
        flex: 1.
    },
    button: {
    },
    text: {
        color: 'white',
    },
})
