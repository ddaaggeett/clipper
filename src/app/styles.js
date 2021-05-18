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
        padding: 10,
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
    clipItem: {
        backgroundColor:'#222',
        marginBottom: 3,
    },
    clipItemText: {
        flex: 1,
        color: 'white',
        fontSize:16,
        padding:5,
    },
    clipItemTextInput: {
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
        padding: 3,
        paddingLeft: 4,
        paddingBottom: 2,
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
    recentVideos: {
        borderTopWidth: 7,
        borderColor: 'purple',
        marginTop: 13,
        marginLeft:20,
        marginRight:20,
    },
    recentVideosText: {
        paddingTop: 15,
        paddingBottom: 10,
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    footer: {
        margin: 0,
        marginTop: 30,
        width: '100%',
        height: 150,
        zIndex: -1,
    },
    footerText: {
        color: '#aaa',
        fontWeight: 'bold',
        fontFamily: 'sans',
    },
    footerLink: {
        marginRight: 20,
    },
    footerLinkGroup: {
        right: 15,
        bottom: 10,
    },
});
