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
        marginTop: 5,
        marginBottom: 5,
    },
    controlButton: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor:'black',
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
    downloadClip: {
        backgroundColor: 'green',
    },
    clipPlayer: {
        position: 'absolute',
        right: 0,
        top: 0,
        borderColor: 'white',
        borderWidth:1,
    },
    commentInput: {
        backgroundColor:'purple',
    },
    titleInput: {
        backgroundColor:'#444',
    },
    whoInput: {
        backgroundColor:'#666',
    },
    playlistItemText: {
        flexWrap: "wrap",
        padding: 5,
    },
    account: {
        alignItems: 'flex-end',
        zIndex: 1,
        backgroundColor: 'black',
        width: '100%',
        paddingTop: 5,
        margin: 0,
        borderBottomWidth: 2,
    },
    accountButton: {
        padding: 7,
        paddingLeft: 25,
        paddingRight: 25,
    },
    loginButton: {
        backgroundColor: 'red',
    },
    logoutButton: {
        backgroundColor: 'purple',
    },
    username: {
        padding: 7,
        paddingLeft: 28,
        paddingRight: 28,
        color:'white',
    },
    panelRow: {
        top: 35,
        alignSelf: 'center',
    },
    videoPanel: {
        right: '50%',
    },
    clipsPanel: {
        left: '50%'
    },
    usernameNative: {
        alignSelf: 'center',
        fontSize: 18,
    },
    thumbnail: {
        width: 160,
        height: 90
    },
    thumbnailWeb: {
        width: 200,
        height: 113
    },
    clipDuration: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        zIndex: 1,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 3,
        color:'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sourceCodeLink: {
        height: 20,
        width: 20,
        zIndex: 1,
        top: 8,
        left: 8,
    },
});
