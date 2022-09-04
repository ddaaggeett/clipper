import { Platform, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'
import * as actions from '../redux/actions/actionCreators'

export default () => {

    const redux = useDispatch()

    const handleLogout = async () => {
        redux(actions.logout())
    }

    let logoutStyle
    if (Platform.OS === 'web') logoutStyle = [styles.webButton, styles.buttonColor]
    else logoutStyle = [styles.nativeButton, styles.buttonColor]

    return (
        <TouchableOpacity
            style={logoutStyle}
            onPress={() => handleLogout()}
            >
            <Text style={styles.controlButtonText}>Logout</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    nativeButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    webButton: {
        padding: 7,
        paddingLeft: 25,
        paddingRight: 25,
    },
    buttonColor: {
        backgroundColor: 'red',
    },
})
