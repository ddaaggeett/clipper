import {
    StyleSheet,
} from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    urlText: {
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        padding: 10,
    },
    controlButton: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 20,
        backgroundColor:'blue',
    },
    controlButtonText: {
        textAlign:"center",
        color: 'white',
        fontWeight:"bold",
    },
    contentRow: {
        flexDirection:"row",
    },
    clipsList: {
    },
    clipItem: {
        borderColor: 'white',
        borderWidth:1,
    },
    clipItemText: {
        color: 'white',
        fontSize:16,
        padding:15,
    },
    deleteClip: {
        backgroundColor: 'red',
    },
    clipPlayer: {
        position: 'absolute',
        right: 0,
        top: 0,
        borderColor: 'white',
        borderWidth:1,
    },
    punchlineInput: {
        backgroundColor:'purple',
    }
});
