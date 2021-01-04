import {
    StyleSheet,
} from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    urlText: {
        marginTop:25,
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
    buttonRow: {
        flexDirection:"row",
    },
    clipsList: {
        marginTop:25,
    },
    clipItem: {
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth:1,
    },
    clipItemText: {
        color: 'white',
        fontSize:16,
    },
});
